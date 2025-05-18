import { Alert } from '@/components/atoms/Alert'
import { Button } from '@/components/atoms/Button'
import { RelatedColumnCard } from '@/components/atoms/RelatedColumnCard'
import { Info, Upload } from 'lucide-react'
import { ChangeEvent, DragEvent, useState } from 'react'
import { Mosaic } from 'react-loading-indicators'
import readXlsxFile from 'read-excel-file'
import style from './uploadSection.module.scss'
import { useAnalysisStore } from '@/configs/analysisStore'
type Props = {
  index: number
}
export const UploadSection = ({ index }: Props) => {
  const { iaInstance, spreadsheets, columns } = useAnalysisStore()
  const columnType = columns[index]
  const spreadsheet = spreadsheets.getSpreadsheet(index)
  const header = spreadsheet.getXlsx().getHeader()
  const file = spreadsheet.getXlsx().file
  const setUpdateTimes = useState(0)[1]
  const loadings = [useState(false), useState(false)]
  const loading = loadings[index][0]
  const setLoading = (value: boolean) => {
    loadings[index][1](value)
  }
  const jsonDataLimited = []
  for (let i = 0; i < 3; i++) {
    jsonDataLimited.push(spreadsheet.getXlsx().getJsonData()[i])
  }
  const relationship = spreadsheet.getRelationship()
  const description = spreadsheet.getDescription()

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

    spreadsheet.getXlsx().file = file
    const rows = await readXlsxFile(file, { sheet: 1 })
    spreadsheet.getXlsx().setRows(rows)

    setLoading(true)
    spreadsheet.setRelationship([])

    const headerList = spreadsheet.getXlsx().getHeader().join(', ')
    const systemList = columnType.stringifyDescriptions()
    try {
      let apiRes = await iaInstance.getRelatedColumns(headerList, systemList)
      if (apiRes.choices?.[0]?.message.content) {
        const apiJSONAux = JSON.parse(
          apiRes.choices[0].message.content.replace(
            /<think>[\s\S]*?<\/think>/g,
            '',
          ),
        )
        spreadsheet.setRelationship(apiJSONAux)
        apiRes = await iaInstance.getDescription(
          spreadsheet.stringifyRelationship(),
          systemList,
        )
        if (apiRes.choices?.[0]?.message.content) {
          const apiDescription = apiRes.choices[0].message.content
          spreadsheet.setDescription(
            apiDescription.replace(/<think>[\s\S]*?<\/think>/g, ''),
          )
        } else {
          throw new Error('Erro ao tentar detalhar a relação das colunas')
        }
      } else {
        throw new Error('Erro ao tentar relacionar as colunas')
      }
    } catch (err) {
      console.error('Erro na API Groq:', err)
      spreadsheet.setRelationship([])
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (loading) return
    const files = event.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      spreadsheet.getXlsx().file = file
      handleFileChange(file)
    }
  }
  const handleFileUpload = () => {
    document.querySelector<HTMLInputElement>(`#fileInput-${index}`)?.click()
  }

  const removeFile = () => {
    spreadsheet.reset()
    setUpdateTimes((prev) => prev + 1)
  }

  return (
    <>
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
            <small>{columnType.uploadDescription}</small>
          )}
          <div className={style.buttonContainer}>
            <Button format="small" onClick={handleFileUpload}>
              Escolher arquivo
            </Button>
            {file && (
              <Button format="small" onClick={removeFile} color="red">
                Remover arquivo
              </Button>
            )}
          </div>
          <input
            id={`fileInput-${index}`}
            type="file"
            accept=".xlsx, .xls"
            className={style.hiddenInput}
            onChange={handleFileChange}
          />
        </div>

        <div className={style.tableContainer}>
          {header.length > 0 ? (
            <>
              <div className={style.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      {header.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jsonDataLimited.map((row, i) => (
                      <tr key={i}>
                        {header.map((h, j) => (
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
                {!loading && description && (
                  <div
                    className={style.chartContainer}
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                )}
                {!loading && !description && (
                  <p className={style.statusText}>Sem resposta da API</p>
                )}
              </div>
            </>
          ) : (
            <p>Nenhum arquivo processado</p>
          )}
        </div>
      </section>
      {relationship.length > 0 && (
        <section className={style.columnsSection}>
          <h3>Altere as relações entre as colunas</h3>
          <div className={style.columnsSectionAlert}></div>
          <div className={style.columnsRow}>
            {relationship.map((item) => (
              <RelatedColumnCard
                key={`${item.system}-${item.client}`}
                item={item}
                columns={header}
                description={columnType.getDescription(item.client)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
