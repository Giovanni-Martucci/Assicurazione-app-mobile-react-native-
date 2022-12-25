import RoadAccidents from "../components/RoadAccidents";
import { connect } from "react-redux";
import { addleft, loadRemoteList, modificacard  } from "../actions";

const mapStateToProps = state => ({
  roadaccidents: state.roadaccidents
});

const mapDispatchToProps = dispatch => ({
  add: (item) => dispatch(addleft(item)), // add vuole un item infatti come parametro nel file action/index e glie lo si passa a sx della freccia
  loadList: () => dispatch(loadRemoteList()),
  mod: (item) => dispatch(modificacard(item)),
});

const RoadAccidentsContainer = connect(mapStateToProps, mapDispatchToProps)(RoadAccidents);

export default RoadAccidentsContainer;
