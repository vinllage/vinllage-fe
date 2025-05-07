package org.koreait.global.router;

import org.koreait.global.exceptions.CommonException;
import org.koreait.main.controllers.MainController;

import java.util.List;
import java.util.Objects;
import java.util.Scanner;

public abstract class Controller {

    private Runnable runnable;
    private List<String> menus;

    // 공통 라인 출력
    public void printLine() {
        System.out.println("---------------------------------------------");
    }
    /**
     * 공통 출력 부분
     * 컨트롤러에 따라 공통 출력을 달리 해야 하는 경우는 재정의를 통해 출력 변경
     *
     */
    public void common() {
        System.out.println("***************** 메뉴 선택 *********************");
    }

    /**
     * 컨트롤러별로 다르게 보여줄 부분
     *
     */
    public abstract void show();

    private void prompt() {
        if (runnable != null) {
            runnable.run();
            return;
        }

        Scanner sc = new Scanner(System.in);
        printLine(); // 라인 출력
        while(true) {
            try {
                System.out.print("메뉴를 선택하세요(m - 메인메뉴, q - 종료): ");
                String command = sc.nextLine().toLowerCase().trim();
                processQuit(command); // 애플리케이션 종료 처리

                if (command.equalsIgnoreCase("m")) { // 메인메뉴 이동
                    Router.change(MainController.class);
                    break;
                }

                if (!command.isBlank() && menus != null && menus.contains(command)) {
                    process(command); // 컨트롤러별로 사용자 입력 명령어 처리
                    break;
                }
            } catch (CommonException e) { // 검증 실패 또는 에러 메세지 출력
                printError(e);
            }
        }
    }

    /**
     * 입력 받은 커맨드 처리
     *
     * 필요한 컨트롤러에서 재정의하여 사용할 것
     * @param command
     */
     public void process(String command) {};

    /**
     * 모든 컨트롤러는 run() 에 정의된 메서드 순서대로 실행된다.
     * - 추상 템플릿 메서드 패턴
     */
    public final void run() {
        common();
        show();
        prompt();
    }

    /**
     * prompt에서 실행될 부분을 교체하고 싶을때 실행할 부분을
     * Runnable 인터페이스를 구현해서 매개변수로 넣을 것
     *
     * @param runnable
     */
    public void setPrompt(Runnable runnable) {
        this.runnable = runnable;
    }


    /**
     * 컨트롤러에서 허용가능한 메뉴 범위 설정
     * @param menus
     */
    public void setMenus(List<String> menus) {
        this.menus = menus;
    }

    /**
     * 애플리케이션 종료 여부 체크
     *
     * @param command
     * @return
     */
    public void processQuit(String command) {
        if (command != null && (command.equals("q") || command.equals("exit") || command.equals("quit"))) {
            System.out.println("애플리케이션을 종료 합니다.");
            System.exit(0);
        }
    }

    /**
     * 항목 하나씩 입력 받는 경우
     *
     * @param message
     * @param sc
     * @return
     */
    public String inputEach(String message, Scanner sc) {
        sc = Objects.requireNonNullElse(sc, new Scanner(System.in));
        while(true) {
            System.out.print(message + ": ");
            String input = sc.nextLine();
            processQuit(input); // 종료 문구가 있는 경우 종료 처리
            if (input != null && !input.isBlank()) {
                input = input.trim();
                if (input.equalsIgnoreCase("m")) { // 메인 메뉴 이동
                    Router.change(MainController.class);
                    break;
                }

                return input;
            }
        }
        return null;
   }

    /**
     * 에러메시지 출력
     * @param e
     */
   public void printError(CommonException e) {
       printLine();
       System.out.printf("[%d]%s%n", e.getStatus(), e.getMessage());
   }
}
