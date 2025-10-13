import { Document, FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

export type CreateDto<T> = Partial<T>;
export type UpdateDto<T> = Partial<T>;

export type FindOptions = QueryOptions;
export type Projection<T> = ProjectionType<T> | Record<string, 0 | 1 | boolean>;

export type DeleteResult = {
  acknowledged: boolean;
  deletedCount: number;
};

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  create(data: CreateDto<T>): Promise<T> {
    return this.model.create(data);
  }

  findById(id: string, projection?: Projection<T>): Promise<T | null> {
    return this.model.findById(id, projection);
  }

  findOne(filter: FilterQuery<T>, projection?: Projection<T>): Promise<T | null> {
    return this.model.findOne(filter, projection);
  }

  find(filter: FilterQuery<T> = {}, options?: FindOptions): Promise<T[]> {
    return this.model.find(filter, null, options);
  }

  update(id: string, data: UpdateDto<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.model.deleteOne({ _id: id });
  }

  deleteMany(filter: FilterQuery<T>): Promise<DeleteResult> {
    return this.model.deleteMany(filter);
  }

  count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
