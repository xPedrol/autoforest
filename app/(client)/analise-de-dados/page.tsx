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

  const uploadFiles = async (
    cadastroFile: File,
    inventarioFile: File,
    token: string // ⬅️ Adicione o token JWT como argumento
  ) => {
    const formData = new FormData();
    formData.append('cadastro', cadastroFile);
    formData.append('inventario', inventarioFile);

    const response = await fetch('http://127.0.0.1:8000/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro no upload: ${errorText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  };

  const finishUpload = () => {
    const validSpreadsheets = spreadsheets.isValid()
    if (!validSpreadsheets) {
      alert('Preencha todos os campos corretamente')
      return
    }
    const normalizedData = spreadsheets.normalizeSpreadsheets(fk)
    console.log('normalizedData', normalizedData)
    const cadastroFile = spreadsheets.getSpreadsheet(0).getXlsx().getFile()
    const inventarioFile = spreadsheets.getSpreadsheet(1).getXlsx().getFile()

    // Nao sei como armazena token no front end
    const token = "your_jwt_token_here"; // ⬅️ Substitua pelo seu token JWT real
    const ans = uploadFiles(cadastroFile, inventarioFile, token)
    console.log('ans: ', ans)
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
