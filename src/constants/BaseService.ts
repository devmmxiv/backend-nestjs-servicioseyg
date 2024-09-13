import { defer, Observable } from "rxjs";
import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class BaseService<T> {
    constructor(protected readonly repository: Repository<T>) {}
  
    // ... Methods for various database operations
    /**
     *   to save or update an entity
     * @param entity
     * @returns
     */
    save(entity: DeepPartial<T>): Observable<T> {
      return defer(() => this.repository.save(entity));
    }
  
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: any, entity: QueryDeepPartialEntity<T>): Observable<UpdateResult> {
      return defer(() => this.repository.update(id, entity));
    }
  
    /**
     *
     * @param entity
     * @param field
     * @param incremental
     * @returns
     */
    increment(
      entity: FindOptionsWhere<T>,
      field: string,
      incremental: number = 1,
    ): Observable<any> {
      return defer(() => this.repository.increment(entity, field, incremental));
    }
   
  }