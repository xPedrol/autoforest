'use client'
import style from './analysis.module.scss'
import { UploadSection } from '@/components/molecules/UploadSection'
import { useState } from 'react'
import { handleClasses } from '@/utils/handleClasses'
import { Button } from '@/components/atoms/Button'
import { useAnalysisStore } from '@/configs/analysisStore'
const SwitchTab = ({ tab }: { tab: 0 | 1 }) => {
  switch (tab) {
    default:
    case 0:
      return <UploadSection index={0} />
    case 1:
      return <UploadSection index={1} />
  }
}

export default function Analysis() {
  const { spreadsheets, fk } = useAnalysisStore()
  const [tab, setTab] = useState<0 | 1>(0)
  const handleActiveTabIndexClasses = (currentTab: 0 | 1) => {
    const classes = [style.tabIndex]
    if (currentTab === tab) {
      classes.push(style.active)
    }
    return handleClasses(classes)
  }
  const finishUpload = () => {
    const validSpreadsheets = spreadsheets.isValid()
    if (!validSpreadsheets) {
      alert('Preencha todos os campos corretamente')
      return
    }
    const normalizedData = spreadsheets.normalizeSpreadsheets(fk)
    console.log('normalizedData', normalizedData)
  }
  return (
    <main className="mainContainer">
      <div className={style.tabIndexes}>
        <div
          className={handleActiveTabIndexClasses(0)}
          onClick={() => setTab(0)}
        >
          Cadastro
        </div>
        <div
          className={handleActiveTabIndexClasses(1)}
          onClick={() => setTab(1)}
        >
          Inventário
        </div>
      </div>
      <SwitchTab tab={tab} />
      <div className={style.buttonContainer}>
        <Button onClick={finishUpload}>Enviar para análise</Button>
      </div>
    </main>
  )
}
