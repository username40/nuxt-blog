const posts = [
  {title: 'Post 1', date: new Date(), views: '20', comments: [1, 2], _id: '114149'},
  {title: 'Post 2', date: new Date(), views: '22', comments: [1], _id: '119158'}
]

export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts)
      },400)
    })
  },
  async remove({}, id) {

  },
  async update({}, {id, text}) {

  },
  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(p => p._id === id))
      },1000)
    })
  },
  async create({}, {title, text}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
}
