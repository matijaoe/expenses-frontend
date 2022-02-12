import type { User } from 'models/user.model'

enum LocalStorageKey {
  User,
  AccessToken,
}

type localStorageItem = string | null

export default class LocalStorageService {
  private static _instance: LocalStorageService

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static get instance(): LocalStorageService {
    if (!this._instance)
      this._instance = new LocalStorageService()

    return this._instance
  }

  public setAccessToken(value: string): void {
    localStorage.setItem(LocalStorageKey[LocalStorageKey.AccessToken], value)
  }

  public getAccessToken(): localStorageItem {
    return localStorage.getItem(LocalStorageKey[LocalStorageKey.AccessToken])
  }

  public removeAccessToken(): void {
    localStorage.removeItem(LocalStorageKey[LocalStorageKey.AccessToken])
  }

  public hasAccessToken(): boolean {
    return this.getAccessToken() != null
  }

  public setUser(value: User): void {
    localStorage.setItem(LocalStorageKey[LocalStorageKey.User], JSON.stringify(value))
  }

  public getUser(): User | null {
    const userJSON = localStorage.getItem(LocalStorageKey[LocalStorageKey.User])
    return userJSON ? JSON.parse(userJSON) : null
  }

  public removeUser(): void {
    return localStorage.removeItem(LocalStorageKey[LocalStorageKey.User])
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public get(key: string): localStorageItem {
    return localStorage.getItem(key)
  }

  public remove(key: string): localStorageItem {
    return localStorage.getItem(key)
  }
}

export { LocalStorageService, LocalStorageKey }
