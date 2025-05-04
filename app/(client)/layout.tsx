import ClientHeader from '@/components/molecules/ClientHeader'

type Props = {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <ClientHeader />
      {children}
    </>
  )
}
