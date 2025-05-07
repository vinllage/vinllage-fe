package org.koreait.board.controllers;

import org.koreait.board.entities.BoardData;
import org.koreait.board.services.BoardInfoService;
import org.koreait.global.paging.SearchForm;
import org.koreait.global.router.Controller;

import java.util.List;

public class BoardListController extends Controller {

    private final BoardInfoService service;
    private List<BoardData> items;

    public BoardListController(BoardInfoService service){
        this.service = service;
    }

    @Override
    public void common() {
        System.out.println("***************** 게시판 목록 *********************");
    }

    @Override
    public void show() {
        SearchForm search = new SearchForm();
        items = service.getList(search);

        printLine();
        System.out.println("게시글번호  |  작성자  |  제목");
        if (items == null || items.isEmpty()) {
            System.out.println("조회된 게시글이 없습니다.");
        } else { // 게시글 출력
            items.forEach(i -> {
                System.out.printf("%d | %s | %s%n", i.getSeq(), i.getPoster(), i.getSubject());
            });
        }
    }
}