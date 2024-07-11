export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("categories"));
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedCategory = savedCategories.find(
      (category) => categoryToSave.id == category.id
    );
    if (existedCategory) {
      //edit categories
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
        //save new categories
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }
}
