import db from './../utils/db'

/**
 * User model.
 * Fields:
 *  name: string
 *  email: string
 *  address: string
 */
class User {
  static FOLDER = 'user'

  name: string
  email: string
  address: string
  id: string

  save = async () => {
    const serializedUser = User.serialize(this)
    await db.save(User.FOLDER, this.id, serializedUser)
  }

  load = async () => {
    const data: string = await db.load(User.FOLDER, this.id)
    const deserializedUser: User = User.deserialize(data)
    this.id = deserializedUser.id
    this.email = deserializedUser.email
    this.address = deserializedUser.address
  }

  private static serialize = (user: User): string => {
    const { name, email, address, id } = user
    return JSON.stringify({
      name,
      email,
      address,
      id
    })
  }

  private static deserialize = (input: string): User => {
    const parsedData: User = JSON.parse(input)
    const user = new User()
    user.id = parsedData.id
    user.email = parsedData.email
    user.address = parsedData.address
    return user
  }

}

export default User