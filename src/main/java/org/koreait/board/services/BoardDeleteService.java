package org.koreait.board.services;

import org.koreait.board.mappers.BoardMapper;
import org.koreait.global.validators.RequiredFieldValidator;

public class BoardDeleteService implements RequiredFieldValidator {
    private BoardMapper mapper;

    public BoardDeleteService(BoardMapper mapper) {
        this.mapper = mapper;
    }

    public void process(long seq) {
        checkTrue(mapper.exists(seq) == 1, "게시글을 찾을 수 없습니다.");
        mapper.delete(seq);
    }
}