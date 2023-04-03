import { ICategory } from "../schemas/category.schema";
import { categoryStore } from "../services/db/hooks/useCategory.hook";
import { BaseModel } from "./Base.model";

export class Category extends BaseModel implements ICategory {
  constructor(public categoryName: string, public orderIndex: number) {
    super();
  }
  public static async create(
    ...params: ConstructorParameters<typeof Category>
  ): Promise<Category> {
    const category = new Category(...params);
    await categoryStore.add(category, {
      message: `successfully added ${category}`,
    });
    return category;
  }
  public save = async () => {
    const category = this.plainObject;
    categoryStore.upsert({ ...category });
  };
}
