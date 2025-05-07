package org.koreait.board.entities;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardData {
    private long seq;
    private long memberSeq;
    private String poster;
    private String subject;
    private String content;
    private LocalDateTime regDt;
    private LocalDateTime modDt;
}
