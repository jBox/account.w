import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './summary.css';
import ProjectCard from '../common/ProjectCard';
import { getProjectsByDate } from "../../redux/actions";
import { project } from "../../redux/selectors/projects";

class Summary extends Component {
    state = {}

    componentDidMount() {
        const { queryProjects } = this.props;
        queryProjects("2016");
    }

    render() {
        const { projects } = this.props;
        if (projects) {
            return (<div className="home-page">
                <ProjectCard project={projects[0]} key={0} />
                <ProjectCard project={projects[1]} key={1} />
                <ProjectCard project={projects[2]} key={2} />
                <ProjectCard project={projects[3]} key={3} />
                <ProjectCard project={projects[4]} key={4} />
                <ProjectCard project={projects[5]} key={5} />
                <ProjectCard project={projects[6]} key={6} />
                <ProjectCard project={projects[7]} key={7} />
                <ProjectCard project={projects[8]} key={8} />
                <ProjectCard project={projects[9]} key={9} />
            </div>);
        } else {
            return (<div>NO DATA</div>);
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        projects: project(state, props)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        queryProjects: bindActionCreators(getProjectsByDate, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);