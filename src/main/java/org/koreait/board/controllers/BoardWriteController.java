package org.koreait.board.controllers;

import org.koreait.board.services.BoardSaveService;
import org.koreait.global.exceptions.CommonException;
import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.member.MemberSession;
import org.koreait.member.entities.Member;

import java.util.Scanner;

public class BoardWriteController extends Controller {

    private final BoardSaveService service;

    public BoardWriteController(BoardSaveService service) {
        this.service = service;

        RequestBoard form = new RequestBoard();

        setPrompt(() ->{
            Scanner sc = new Scanner(System.in);
            // 로그인한 회원 이름으로 작성자를 완성
            Member member = MemberSession.getMember();
            form.setPoster(member.getName());
            while(true){
                try{
                    String subject = inputEach("1. 제목", sc);
                    form.setSubject(subject);

                    String content = inputEach("2. 내용", sc);
                    form.setContent(content);

                    service.process(form);
                    break;
                }catch(CommonException e){
                    printError(e);
                }
            }
            Router.change(BoardController.class);
        });
    }



    @Override
    public void show() {
        System.out.println("게시글을 작성하기 위한 내용을 입력하세요( m - 메인메뉴, q - 종료)");
    }

    @Override
    public void common(){
        System.out.println("************** 게시글 작성 **************");
    }
}
