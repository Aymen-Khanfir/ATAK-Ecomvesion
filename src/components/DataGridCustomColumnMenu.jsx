import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem ,
  GridColumnMenuHideItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, colDef, ...other } = props;

  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      colDef={colDef}
      {...other}
    >
      <GridColumnMenuFilterItem  onClick={hideMenu} colDef={colDef} />
      <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;