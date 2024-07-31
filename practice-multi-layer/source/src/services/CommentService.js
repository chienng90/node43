import commentRepository from "../repositories/CommentRepository.js";

class CommentService {
  #commentRepository;

  constructor(commentRepository) {
    this.#commentRepository = commentRepository;
  }

  async retrieveComments(user, imageId, currentPage, itemPerPage) {
    let result = this.#commentRepository.retrieveComments(
      user.user_id,
      imageId,
      { offset: currentPage - 1, limit: itemPerPage }
    );

    return {
      data: [...result.data],
      pagination: {
        items: result.pagination.items,
        pages: result.pagination.pages,
        currentPage: result.pagination.offset + 1,
        itemPerPage: result.pagination.limit,
      },
    };
  }

  async comment(user, imageId, content) {
    return await this.#commentRepository.createComment(user.user_id, imageId, {
      content,
      date: new Date(),
    });
  }
}

// Export an instance of the CommentService class
const commentService = new CommentService(commentRepository);
export { commentService };
