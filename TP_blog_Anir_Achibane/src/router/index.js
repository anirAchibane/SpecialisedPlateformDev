import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePostView from '@/views/CreatePostView.vue'
import PostDetailVue from '@/views/PostDetailVue.vue'
import TaggedPostsView from '@/views/TaggedPostsView.vue'
import EditPostView from '@/views/EditPostView.vue'

const routes = [
  {
    name: "Home",
    path: '/',  
    component: HomeView, 
  },
  {
    name: "postDetails",
    path: '/post/:id',
    component: PostDetailVue,
  },
  {
    name: "createPost",
    path: '/create',
    component: CreatePostView
  },
  {
    path: '/tags/:tag',
    name: 'taggedPosts',
    component: TaggedPostsView,
  },
  {
    path: '/edit/:id',
    name: 'editPost',
    component: EditPostView,

  }                    
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
