package org.koreait.board.controllers;

import org.koreait.board.entities.BoardData;
import org.koreait.board.services.BoardDeleteService;
import org.koreait.board.services.BoardInfoService;
import org.koreait.global.paging.SearchForm;
import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.member.MemberSession;

import java.util.List;
import java.util.Scanner;

public class BoardDeleteController extends Controller {
    private final BoardInfoService service;
    private final BoardDeleteService deleteService;
    private List<BoardData> items;
    private int test;

    public BoardDeleteController(BoardInfoService service, BoardDeleteService deleteService){
        this.service = service;
        this.deleteService = deleteService;
        //setMenus(List.of("1", "2", "3"));

        setPrompt(() ->{
            Scanner sc = new Scanner(System.in);
            test = sc.nextInt();
            deleteService.process(test);
            System.out.println("게시글이 삭제 되었습니다.");

            Router.change(BoardController.class);
        });
    }

    @Override
    public void common() {
        System.out.println("***************** 내 게시글 목록 *********************");
    }

    @Override
    public void show() {
        SearchForm search = new SearchForm();
        //search.setMemberSeq(MemberSession.getMember().getSeq()); 상준님 굿! 아이디어!
        service.updateMapper();
        items = service.getList(search);

        printLine();
        System.out.println("게시글번호 |  작성자  |  제목  |  내용");
        if (items == null || items.isEmpty()) {
            System.out.println("조회된 게시글이 없습니다.");
        } else { // 게시글 출력
            items.forEach(i -> {
                if(i.getMemberSeq() == MemberSession.getMember().getSeq()) {
                    System.out.printf("%d | %s | %s |  %s%n", i.getSeq(), i.getPoster(), i.getSubject(), i.getContent());
                }
            });
        }
        System.out.println("삭제할 게시글 번호를 선택해주세요.");
    }
}