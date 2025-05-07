package org.koreait.board.controllers;

import org.koreait.board.entities.BoardData;
import org.koreait.board.mappers.BoardMapper;
import org.koreait.global.paging.SearchForm;
import org.koreait.global.router.Controller;

import java.util.List;

public class BoardListController extends Controller {
    private final BoardMapper mapper;

    public BoardListController(BoardMapper mapper) {
        System.out.println(">>> BoardListController 생성자 호출됨 - mapper: " + mapper);
        this.mapper = mapper;//ServiceContainer.getBean(BoardMapper.class);

        setPrompt(() -> {
            System.out.println("==== 게시글 목록 ====");
            SearchForm search = new SearchForm();
            search.setOffset(0);
            search.setLimit(10); //10개
            List<BoardData> list = mapper.getList(search);

            for (BoardData post : list) {
                System.out.printf("번호: %d | 제목: %s | 작성자: %s\n",
                        post.getSeq(), post.getSubject(), post.getPoster());
            }

            // 목록 보여주고 바로 메뉴로 돌아감 (Scanner 대기 없음)
            System.out.println("\n엔터를 누르면 이전 메뉴로 돌아갑니다.");
            try {
                System.in.read(); // 간단한 대기
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public void show() {
        System.out.println("게시글 목록을 불러오는 중입니다...");
    }

    @Override
    public void common() {
        System.out.println("*********** 게시글 목록 ***********");
    }
}
