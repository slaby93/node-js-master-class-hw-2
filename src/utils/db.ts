import * as fs from 'fs'
const DATA_FOLDER = '.data'

export default {
  save: async (folder: string, file: string, data: any) => {
    try {
      await new Promise((resolve, reject) => {
        fs.writeFile(`${DATA_FOLDER}/${folder}/${file}`, data, error => {
          error ? reject(error) : resolve()
        })
      })
    } catch (error) {
      // @TODO: move to logger
      console.log({ error })
    }
  },
  load: async (folder: string, file: string): Promise<any> => {
    try {
      return await new Promise((resolve, reject) => {
        fs.readFile(`${DATA_FOLDER}/${folder}/${file}`, { encoding: 'utf-8', flag: 'r' }, (error, data) => {
          data && !error ? resolve(data) : reject(error)
        })
      })
    } catch (error) {
      //@TODO move to logger
      console.error({ error })
    }
  },
  update: async (folder: string, file: string, data: any) => {

  },
  delete: async (folder: string, file: string) => {

  },
}