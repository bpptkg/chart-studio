import AboutView from '@/views/AboutView.vue'
import ChartEditor from '@/views/editor/ChartEditor.vue'
import BuildView from '@/views/editor/build/BuildView.vue'
import CompareView from '@/views/editor/compare/CompareView.vue'
import RequestView from '@/views/editor/request/RequestView.vue'
import FileManager from '@/views/files/FileManager.vue'

export default [
  {
    path: '/',
    redirect: '/file',
  },
  {
    path: '/files',
    component: FileManager,
  },
  {
    path: '/file',
    component: ChartEditor,
    redirect: '/file/build',
    children: [
      {
        path: 'build',
        component: BuildView,
      },
      {
        path: 'compare',
        component: CompareView,
      },
      {
        path: 'request',
        component: RequestView,
      },
    ],
  },
  {
    path: '/about',
    component: AboutView,
  },
]
