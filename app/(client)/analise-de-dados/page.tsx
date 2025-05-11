'use client'
import { Button } from '@/components/atoms/Button'
import style from './analysis.module.scss'
import { Upload } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import { createGroqBody, groqClient } from '@/configs/groq'
import { Mosaic } from 'react-loading-indicators'

export default function Analysis() {
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [jsonData, setJsonData] = useState<Record<string, string>[]>([])
  const [apiResponse, setApiResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    if (loading) return
    const file = event.target.files[0]
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
    setApiResponse('')

    // Preparar strings para o prompt
    const headerList = cols.join(', ')
    const sampleRow = rows[1].join(', ')

    try {
      const stream = await groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        stream: true,
        messages: createGroqBody(headerList, sampleRow),
      })

      // Consumir o stream incrementalmente
      let accumulated = ''
      for await (const part of stream) {
        const delta = part.choices?.[0]?.delta?.content
        if (delta) {
          accumulated += delta
          setApiResponse(accumulated)
        }
      }
    } catch (err) {
      console.error('Erro na API Groq:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = () => {
    document.querySelector<HTMLInputElement>('#fileInput')?.click()
  }

  return (
    <main className="mainContainer">
      <div className={style.analysisContainer}>
        <div className={style.uploadContainer}>
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
            accept=".xlsx, .xls, .csv"
            className={style.hiddenInput}
            onChange={handleFileChange}
          />
        </div>

        <div className={style.tableContainer}>
          {jsonData.length > 0 ? (
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
                <h3>Resultado da Análise</h3>
                {loading && (
                  <p className={style.statusText}>
                    <Mosaic size="small" color="#ccc" />
                  </p>
                )}
                {!loading && apiResponse && (
                  <div
                    className={style.chartContainer}
                    dangerouslySetInnerHTML={{ __html: apiResponse }}
                  />
                )}
                {!loading && !apiResponse && (
                  <p className={style.statusText}>Sem resposta da API</p>
                )}
              </div>
            </>
          ) : (
            <p>Nenhum arquivo processado</p>
          )}
        </div>
      </div>
    </main>
  )
}
