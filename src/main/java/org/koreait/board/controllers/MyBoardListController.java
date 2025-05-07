package org.koreait.board.controllers;

import org.koreait.board.entities.BoardData;
import org.koreait.board.services.BoardInfoService;
import org.koreait.board.services.BoardSaveService;
import org.koreait.global.paging.SearchForm;
import org.koreait.global.router.Controller;
import org.koreait.member.MemberSession;

import java.util.List;
import java.util.Scanner;

public class MyBoardListController extends Controller{
    private final BoardInfoService infoService;
    private final BoardSaveService saveService;
    private List<BoardData> items;

    public MyBoardListController(BoardInfoService infoService, BoardSaveService saveService) {
        this.infoService = infoService;
        this.saveService = saveService;
    }

    @Override
    public void common() {
        System.out.println("***************** 내 게시글 목록 *********************");
    }

    @Override
    public void show() {
        SearchForm search = new SearchForm();
        search.setMemberSeq(MemberSession.getMember().getSeq()); //

        items = infoService.getList(search);

        printLine();
        System.out.println("게시글번호 |  작성자  |  제목  |  내용");
        if (items == null || items.isEmpty()) {
            System.out.println("조회된 게시글이 없습니다.");
        } else { // 게시글 출력
            items.forEach(i -> {
                System.out.printf("%d | %s | %s |%s%n", i.getSeq(), i.getPoster(), i.getSubject(),i.getContent());
            });

            Scanner scanner = new Scanner(System.in);

            System.out.print("수정할 게시글 번호를 입력하세요: ");
            int seq = Integer.parseInt(scanner.nextLine());


            BoardData target = null;
            for (BoardData item : items) {
                if (item.getSeq() == seq) {
                    target = item;
                    break;
                }
            }

            if (target == null) {
                System.out.println("해당 게시글을 찾을 수 없습니다.");
                return;
            }

            System.out.print("새 내용 입력 : ");
            String newContent = scanner.nextLine();

            target.setContent(newContent);
            target.setSubject(target.getSubject() + " (수정) ");
            saveService.save(target);

            System.out.println("게시글 수정 완료");
        }
    }
}
