'use client'
import { Button } from '@/components/atoms/Button'
import style from './analysis.module.scss'
import { Info, Upload } from 'lucide-react'
import { ChangeEvent, DragEvent, useMemo, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import {
  createGroqColumnsBody,
  createGroqDescriptionBody,
  groqClient,
} from '@/configs/groq'
import { Mosaic } from 'react-loading-indicators'
import { Alert } from '@/components/atoms/Alert'
import { RelatedColumnCard } from '@/components/atoms/RelatedColumnCard'
import { TRelatedColumn } from '@/types/relatedColumn'
import { systemColumnsDescription } from '@/configs/columns'

export default function Analysis() {
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [jsonData, setJsonData] = useState<Record<string, string>[]>([])
  const [apiJSON, setApiJSON] = useState<TRelatedColumn[]>([])
  const [relatedDescription, setRelatedDescription] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement> | File,
  ) => {
    if (loading) return
    let file: File | null = null
    if (event instanceof File) {
      file = event
    } else if (event.target.files) {
      file = event.target.files[0]
    }
    if (!file) return

    setFile(file)
    const rows = await readXlsxFile(file, { sheet: 1 })
    const cols = rows[0] as string[]
    setHeaders(cols)
    const sample = rows
      .slice(1, 4)
      .map((row) =>
        cols.reduce((obj, col, i) => ({ ...obj, [col]: row[i] }), {}),
      )
    setJsonData(sample)

    setLoading(true)
    setApiJSON([])

    // Preparar strings para o prompt
    const headerList = cols.join(', ')

    try {
      let apiRes = await groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: createGroqColumnsBody(headerList),
      })
      if (apiRes.choices?.[0]?.message.content) {
        const apiJSONAux = JSON.parse(apiRes.choices[0].message.content)
        setApiJSON(apiJSONAux)
        console.log('Resposta da API:', apiJSONAux)
        apiRes = await groqClient.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: createGroqDescriptionBody(apiJSONAux),
        })
        if (apiRes.choices?.[0]?.message.content) {
          const apiDescription = apiRes.choices[0].message.content
          setRelatedDescription(apiDescription)
          console.log('Resposta da API:', apiDescription)
        } else {
          throw new Error('Erro ao tentar detalhar a relação das colunas')
        }
      } else {
        throw new Error('Erro ao tentar relacionar as colunas')
      }
    } catch (err) {
      console.error('Erro na API Groq:', err)
      setApiJSON([])
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    debugger
    if (loading) return
    const files = event.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      setFile(file)
      handleFileChange(file)
    }
  }
  const handleFileUpload = () => {
    document.querySelector<HTMLInputElement>('#fileInput')?.click()
  }
  const clientColumnsArray = useMemo(() => {
    return apiJSON.map((item) => item.client)
  }, [apiJSON])
  return (
    <main className="mainContainer">
      <section className={style.analysisSection}>
        <div
          className={style.uploadContainer}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          <Upload />
          <h3>Análise de Dados</h3>
          {file ? (
            <p className={style.fileName}>Arquivo: {file.name}</p>
          ) : (
            <small>
              Submeta sua planilha Excel e receba uma análise resumida.
            </small>
          )}
          <div className={style.buttonContainer}>
            <Button format="small" onClick={handleFileUpload}>
              Escolher arquivo
            </Button>
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx, .xls"
            className={style.hiddenInput}
            onChange={handleFileChange}
          />
        </div>

        <div className={style.tableContainer}>
          {headers.length > 0 ? (
            <>
              <div className={style.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      {headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData.map((row, i) => (
                      <tr key={i}>
                        {headers.map((h, j) => (
                          <td key={j}>{row[h]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={style.columnAnalysis}>
                <h3>Relações Encontradas</h3>
                <Alert
                  color="blue"
                  icon={<Info />}
                  description="Para realizar os cálculos adequadamente, precisamos mapear as colunas da sua planilha com nosso sistema padrão. Abaixo você encontrará as relações sugeridas entre suas colunas e as colunas do sistema. Você pode revisar e ajustar essas relações conforme necessário."
                />
                {loading && (
                  <p className={style.statusText}>
                    <Mosaic size="small" color="#ccc" />
                  </p>
                )}
                {!loading && relatedDescription && (
                  <div
                    className={style.chartContainer}
                    dangerouslySetInnerHTML={{ __html: relatedDescription }}
                  />
                )}
                {!loading && !relatedDescription && (
                  <p className={style.statusText}>Sem resposta da API</p>
                )}
              </div>
            </>
          ) : (
            <p>Nenhum arquivo processado</p>
          )}
        </div>
      </section>
      {apiJSON.length > 0 && (
        <section className={style.columnsSection}>
          <h3>Altere as relações entre as colunas</h3>
          <div className={style.columnsSectionAlert}></div>
          <div className={style.columnsRow}>
            {apiJSON.map((item) => (
              <RelatedColumnCard
                key={`${item.system}-${item.client}`}
                systemHeader={item.system}
                providedHeader={item.client}
                columns={clientColumnsArray}
                description={
                  systemColumnsDescription[
                    item.system as keyof typeof systemColumnsDescription
                  ]
                }
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
