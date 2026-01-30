import fs from 'fs'
import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { fileURLToPath } from 'url'
import PgClient from 'pg-cloudflare';
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare';
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ContactMessages } from './collections/ContactMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  return typeof resolved === 'string' && resolved.endsWith(path.join('payload', 'bin.js'))
})
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ContactMessages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: ['http://localhost:5173'],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
db: postgresAdapter({
  // @ts-ignore – pg-cloudflare client is compatible at runtime
  client: PgClient,
  pool: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    keepAlive: true,
    max: 5,
    idleTimeoutMillis: 300_000, // 5 min aligns with Neon idle timeout
  },
}),

  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2 as any,
      collections: { media: true },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
