import { Model } from "@nozbe/watermelondb";
import { field, action } from "@nozbe/watermelondb/decorators";

export default class Post extends Model {
  static table = "posts";

  @field("title")
  title;

  @field("subtitle")
  subtitle;

  @field("body")
  body;

  @action
  async addComment() {
    return this.collections.get("posts").create(post => {
      post.title = "Tamasuke";
      post.body = "Lorem ipsum dolor sit";
    });
  }
}
