import Header from '@/components/molecules/Header'

type Props = {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
