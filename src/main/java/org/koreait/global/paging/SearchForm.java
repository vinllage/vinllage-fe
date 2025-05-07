package org.koreait.global.paging;

import lombok.Data;

@Data
public class SearchForm {
    private int page;
    private int offset;
    private int limit;
    private String sopt;
    private String skey;
}
