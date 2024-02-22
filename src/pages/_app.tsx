import Layout from '@/components/Layout'
import { GlobalStyle, View } from '@/styles/global'
import theme from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import dayjs from 'dayjs'
import dayjsRelativeTime from 'dayjs/plugin/relativeTime'
import ptBRLocale from 'dayjs/locale/pt-br'
import { MobileProvider } from '@/contexts/useMobile'
import { SdkProvider } from '@/contexts/useSdk'

import { Toaster } from 'sonner'

dayjs.extend(dayjsRelativeTime)
dayjs.locale(ptBRLocale)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Toaster />
        <SdkProvider>
          <MobileProvider>
            <Layout>
              <View>
                <Component {...pageProps} />
              </View>
            </Layout>
          </MobileProvider>
        </SdkProvider>
      </ThemeProvider>
    </>
  )
}
