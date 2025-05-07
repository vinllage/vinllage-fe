package org.koreait.board.services;

import org.koreait.board.entities.BoardData;
import org.koreait.board.mappers.BoardMapper;
import org.koreait.global.configs.DBConn;
import org.koreait.global.paging.SearchForm;

import java.util.List;

public class BoardInfoService {
    private BoardMapper mapper;

    public BoardInfoService(){

    }

    public List<BoardData> getList(SearchForm search){
        mapper = DBConn.getInstance().getSession().getMapper(BoardMapper.class);
        int page = Math.max(search.getPage(), 1);
        int limit = search.getLimit();
        limit = limit < 1 ? 10 : limit;
        int offset = (page - 1) * limit;

        search.setOffset(offset);
        search.setPage(page);
        search.setLimit(limit);

        return mapper.getList(search);
    }
}
