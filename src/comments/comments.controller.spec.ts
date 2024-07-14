import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

// CommentsService Mocking
const mockCommentsService = {
  createComment: jest.fn(),
  getCommentList: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

// Create Comment DTO
const createCommentDto = {
  cardId: 1,
  comment: 'Test Comment',
};

// Get Comment List DTO
const getCommentListDto = {
  cardId: 1,
};

// Update Comment DTO
const updateCommentDto = {
  comment: 'Test Comment Update',
};

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  // 테스트 후에 임시 데이터 초기화
  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createComment', () => {
    it('should create comment', async () => {
      // GIVEN
      const createCommentResult = {
        id: 1,
        comment: 'Test Comment',
        isDeleted: false,
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      const req = { user: { id: 1 } };

      // WHEN
      mockCommentsService.createComment.mockResolvedValue(createCommentResult);

      // THEN
      const response = await controller.createComment(req, createCommentDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(createCommentResult);
      expect(mockCommentsService.createComment).toHaveBeenCalledWith(req.user.id, createCommentDto);
    });
  });

  describe('getCommentList', () => {
    it('should get comment list', async () => {
      // GIVEN
      const getCommentListResult = [
        {
          id: 1,
          comment: 'Test Comment 1',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
        {
          id: 2,
          comment: 'Test Comment 2',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
      ];
      const req = { user: { id: 1 } };

      // WHEN
      mockCommentsService.getCommentList.mockResolvedValue(getCommentListResult);

      // THEN
      const response = await controller.getCommentList(req, getCommentListDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(getCommentListResult);
      expect(mockCommentsService.getCommentList).toHaveBeenCalledWith(
        req.user.id,
        getCommentListDto
      );
    });
  });

  describe('updateComment', () => {
    it('should update comment', async () => {
      // GIVEN
      const updateCommentResult = {
        status: 201,
        message: '댓글 수정에 성공했습니다.',
      };
      const req = { params: { commentId: 1 }, user: { id: 1 } };

      // WHEN
      mockCommentsService.updateComment.mockResolvedValue(updateCommentResult);

      // THEN
      const response = await controller.updateComment(req, req.params.commentId, updateCommentDto);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(updateCommentResult);
      expect(mockCommentsService.updateComment).toHaveBeenCalledWith(
        req.user.id,
        req.params.commentId,
        updateCommentDto
      );
    });
  });

  describe('deleteComment', () => {
    it('should delete comment', async () => {
      // GIVEN
      const deleteCommentResult = {
        status: 201,
        message: '댓글 삭제에 성공했습니다.',
      };
      const req = { params: { commentId: 1 }, user: { id: 1 } };

      // WHEN
      mockCommentsService.deleteComment.mockResolvedValue(deleteCommentResult);

      // THEN
      const response = await controller.deleteComment(req, req.params.commentId);
      expect(response).toHaveBeenCalledTimes(1);
      expect(response).toBe(deleteCommentResult);
      expect(mockCommentsService.deleteComment).toHaveBeenCalledWith(
        req.user.id,
        req.params.commentId
      );
    });
  });
});
