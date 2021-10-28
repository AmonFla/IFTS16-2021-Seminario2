
module.exports = async () => {
  const { category, post, tag } = sequelize.models
  console.log('creating Association')
  post.belongsTo(category)
  category.hasMany(post)

  post.belongsToMany(tag, { through: 'tag_post' })
  tag.belongsToMany(post, { through: 'tag_post' })
}
