import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { CreateCollectionInterface } from './../types/createCollection.interface'
import { CreateTaskInterface } from './../types/createTask.interface'
import { CollectionInterface } from './../types/collection.interface'
import { TaskInterface } from 'src/app/shared/types/task.interface'

import { environment } from 'src/environments/environment'

@Injectable()
export class CollectionsService {
    collectionsUrl: string = environment.apiUrl + 'collections'

    constructor(private http: HttpClient) {}

    createCollection(request: CreateCollectionInterface): Observable<boolean> {
        const url = this.collectionsUrl + '/create'

        return this.http.post<boolean>(url, request)
    }

    getCollections(): Observable<CollectionInterface[]> {
        return this.http.get<CollectionInterface[]>(this.collectionsUrl)
    }

    deleteCollection(id: string): Observable<boolean> {
        const url = this.collectionsUrl + '/' + id

        return this.http.delete<boolean>(url)
    }

    createTask(request: CreateTaskInterface, collId: string): Observable<TaskInterface> {
        const url = this.collectionsUrl + '/task/create'

        return this.http.post<TaskInterface>(url, { request, collId })
    }

    deleteTask(_id: string, collId: string): Observable<boolean> {
        const url = `${this.collectionsUrl}/${collId}/${_id}`

        return this.http.delete<boolean>(url)
    }

    updateTask(_id: string, collId: string): Observable<TaskInterface> {
        const url = `${this.collectionsUrl}/${collId}/${_id}`

        return this.http.put<TaskInterface>(url, {})
    }
}
