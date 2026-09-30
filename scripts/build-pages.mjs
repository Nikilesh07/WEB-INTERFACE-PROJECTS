import { cpSync, copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const projects = [
  { slug: 'attendance-checker', directory: 'attendance checker/attendance-checker', type: 'vite' },
  { slug: 'counter-app', directory: 'counter app html', type: 'html', entry: 'counter.html' },
  { slug: 'student-portfolio', directory: 'portfolio/student-portfolio', type: 'vite' },
  { slug: 'student-portfolio-react', directory: 'portfolioreact/student-portfolio-react', type: 'vite' },
  { slug: 'react-router-demo', directory: 'react-router/router-react', type: 'vite', router: true },
  { slug: 'simple-calculator', directory: 'simple-calculator', type: 'vite' },
  { slug: 'student-portal', directory: 'student portal/student-portal', type: 'vite' },
  { slug: 'student-profile-card', directory: 'studentprofilecard', type: 'html', entry: 'profile.html' },
  { slug: 'task-manager', directory: 'task manager/task-manager-react', type: 'vite' },
  { slug: 'to-do-app', directory: 'to do app/todoapp', type: 'vite' },
]

const repository = process.argv[2] || basename(process.cwd())
const repositoryParts = repository.split('/').filter(Boolean)
const owner = repositoryParts.length > 1 ? repositoryParts[0] : ''
const repositoryName = repositoryParts.at(-1)
const isUserSite = owner && repositoryName.toLowerCase() === `${owner}.github.io`.toLowerCase()
const siteBase = isUserSite ? '/' : `/${repositoryName}/`
const outputDirectory = resolve('dist')

function runNpm(args, directory, env = process.env) {
  const windows = process.platform === 'win32'
  const command = windows ? process.env.ComSpec || 'cmd.exe' : 'npm'
  const commandArgs = windows ? ['/d', '/s', '/c', `npm ${args.join(' ')}`] : args
  const result = spawnSync(command, commandArgs, {
    cwd: directory,
    env,
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status || 1)
}

rmSync(outputDirectory, { recursive: true, force: true })
mkdirSync(join(outputDirectory, 'projects'), { recursive: true })
copyFileSync(resolve('index.html'), join(outputDirectory, 'index.html'))
writeFileSync(join(outputDirectory, '.nojekyll'), '')

for (const project of projects) {
  const sourceDirectory = resolve(project.directory)
  const destination = join(outputDirectory, 'projects', project.slug)
  mkdirSync(destination, { recursive: true })

  if (project.type === 'html') {
    copyFileSync(join(sourceDirectory, project.entry), join(destination, 'index.html'))
    continue
  }

  const basePath = `${siteBase}projects/${project.slug}/`
  const env = { ...process.env, VITE_BASE_PATH: basePath }
  runNpm(['install', '--no-package-lock'], sourceDirectory, env)
  runNpm(['run', 'build'], sourceDirectory, env)
  cpSync(join(sourceDirectory, 'dist'), destination, { recursive: true })

  if (project.router) {
    copyFileSync(join(destination, 'index.html'), join(destination, '404.html'))
  }
}

console.log(`Built ${projects.length} projects for ${repository} into ${outputDirectory}`)