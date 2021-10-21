import styled from 'styled-components'

export const StyledPaginateContainer = styled.div`
.pagination {
   
    list-style-type: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: end;
        -ms-flex-align: end;
            align-items: flex-end;
    bottom: 0;
    
  }
  
  .pagination-page {
    width: 3em;
    height: 3em;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
            text-transform: uppercase; 
            border-color: transparent;
            border-bottom: 2px solid transparent;
    margin: 0.5em 0.5em;
    color:#8B8B8B;
    font-size:20px;
  }
  
  .pagination-page:hover {
  border-color: #F792A4;
  color:#bdbdbd
  }
  
  .pagination-prev {
    display:none;
  }
  
  .pagination-next {
    display:none;
  }
  
  
  .pagination-active {
    border-color: #F03254;
    color: #F03254;
  }
  
  .pagination-link {
 
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
            width: 3em;
            height: 3em;
            border-color: transparent;
   
  }
  
  .pagination-link:focus {
    outline: none;
   
    width: 3em;
    height: 3em;
  }
  `