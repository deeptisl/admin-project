import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { allCorporates, corporateData } from '../../redux/actions';


function mapDispatchToProps(dispatch) {
    return {
        allCorporatesAction: () => dispatch(allCorporates()),
        corporateDataAction: (data, actionPerform) => dispatch(corporateData(data, actionPerform)),
    };
}

const mapStateToProps = state => {
    return {
        toatlCorporates: state.toatlCorporates,
        corporatesResult: state.corporatesResult,
    };
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdd: false
        }
    }

    componentWillMount() {
        const { allCorporatesAction } = this.props;
        this.setState({ isAdd: false })
        allCorporatesAction();
    }

    handleClick = (data, actionPerform) => {
        const { corporateDataAction } = this.props;
        corporateDataAction(data, actionPerform)
        const { corporatesResult } = this.props;
        if (corporatesResult) {
            this.setState({ isAdd: true });
        }
    }

    render() {
        const { toatlCorporates } = this.props;
        const { isAdd } = this.state;
        if (isAdd) {
            return <Redirect to="/Dashboard/AddCorporates" />;
        }
        return (
            <div>
                <Button onClick={() => this.setState({ isAdd: true })}>Add</Button>
                <div>
                    {
                        (toatlCorporates && toatlCorporates.data) && (
                            toatlCorporates.data.map((corporates) => {
                                return (
                                    <Card border="success" key={corporates.id} style={{ margin: '20px' }}>
                                        <Card.Header>
                                            <Row>
                                                <Col sm={8}>
                                                    {corporates.name}
                                                </Col>
                                                <Col sm={2}>
                                                    <Button onClick={() => this.handleClick(corporates, 'Update')}>Update</Button>
                                                </Col>
                                                <Col sm={2}>
                                                    <Button onClick={() => this.handleClick(corporates, 'View')}>View</Button>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                    </Card>
                                )
                            })
                        )
                    }
                </div>
            </div>
        );
    }
}


const DashboardPage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);

export default DashboardPage;