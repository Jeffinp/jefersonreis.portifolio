import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ErrorProps {
  statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>
          {statusCode
            ? `${statusCode}: ${t('error.serverError')}`
            : t('error.clientError')}
        </title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-4 text-6xl font-bold text-red-500">
            {statusCode || '404'}
          </h1>
          <h2 className="mb-6 text-2xl font-medium">
            {statusCode
              ? t('error.serverErrorMessage')
              : t('error.clientErrorMessage')}
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            {t('error.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {t('error.goBack')}
            </button>
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t('error.goHome')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
