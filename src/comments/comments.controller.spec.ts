import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Board } from 'src/boards/entities/board.entity';

// CommentsService Mocking
const mockCommentsService = {
  createComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

// Create Comment DTO
const createCommentDto = {
  cardId: 1,
  comment: 'Test Comment',
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
      providers: [
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: getRepositoryToken(Comment), useValue: {} },
        { provide: getRepositoryToken(Board), useValue: {} },
      ],
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
      // 필요한 설정을 하는 부분
      const createCommentResult = {
        id: 1,
        comment: 'Test Comment',
        isDeleted: false,
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      const req = { user: { id: 1 } };

      // 모킹된 서비스 코드의 반환값을 설정하는 부분
      mockCommentsService.createComment.mockResolvedValue(createCommentResult);

      // WHEN
      // 실제로 컨트롤러의 메서드를 동작시키는 부분
      // 컨트롤러 메서드의 매개변수로 req, createCardDto를 사용
      const response = await controller.createComment(createCommentDto, req);

      // THEN
      // 테스트 진행하는 부분
      // 컨트롤러 메서드가 1번 실행되었는지 확인
      expect(mockCommentsService.createComment).toHaveBeenCalledTimes(1);
      // 실행 결과값과 임의의 반환값이 같은지 확인
      expect(response).toEqual(createCommentResult);
      // 서비스의 메서드를 호출할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockCommentsService.createComment).toHaveBeenCalledWith(createCommentDto, req.user);
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

      mockCommentsService.updateComment.mockResolvedValue(updateCommentResult);

      // WHEN
      const response = await controller.updateComment(req.params.commentId, updateCommentDto);

      // THEN
      expect(mockCommentsService.updateComment).toHaveBeenCalledTimes(1);
      expect(response).toEqual(updateCommentResult);
      expect(mockCommentsService.updateComment).toHaveBeenCalledWith(
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

      mockCommentsService.deleteComment.mockResolvedValue(deleteCommentResult);

      // WHEN
      const response = await controller.deleteComment(req.params.commentId);

      // THEN
      expect(mockCommentsService.deleteComment).toHaveBeenCalledTimes(1);
      expect(response).toEqual(deleteCommentResult);
      expect(mockCommentsService.deleteComment).toHaveBeenCalledWith(req.params.commentId);
    });
  });
});
