import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { allCorporates, corporateData, viewSingleCorporate } from '../../redux/actions';
import "./dashboard.css";

function mapDispatchToProps(dispatch) {
    return {
        allCorporatesAction: () => dispatch(allCorporates()),
        corporateDataAction: (data, actionPerform) => dispatch(corporateData(data, actionPerform)),
        viewSingleCorporateAction: (id, actionPerform) => dispatch(viewSingleCorporate(id, actionPerform)),
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
            isAdd: false,
        }
    }

    componentWillMount() {
        const { allCorporatesAction } = this.props;
        this.setState({ isAdd: false })
        allCorporatesAction();
    }

    handleClick = (data, actionPerform) => {
        const { corporateDataAction, viewSingleCorporateAction } = this.props;
        if (actionPerform === 'View') {
            viewSingleCorporateAction(data.id, actionPerform).then(() => {
                const { corporatesResult } = this.props;
                if (corporatesResult) {
                    this.setState({ isAdd: true });
                }
            });
        }
        else {
            corporateDataAction(data, actionPerform);
            const { corporatesResult } = this.props;
            if (corporatesResult) {
                this.setState({ isAdd: true });
            }
        }
    }

    render() {
        const { isAdd } = this.state;
        const { toatlCorporates } = this.props;

        if (isAdd) {
            return <Redirect to="/Dashboard/AddCorporates" push/>;
        }
        return (
            <div className="dashboard">
                <div className="dashboard__Container">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className="dashboard__columnOne">
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div className="sidebar__titleContainer">
                                    <p className="sidebar__title">Manage your Admin Details</p>
                                </div>
                                <button className="Button" onClick={() => this.handleClick([], 'Add')}>Add Corporate</button>
                            </div>
                        </div>

                        <div
                            className="cardGlobal"
                            style={{
                                width: "65%",
                                height: "760px",
                                padding: "1px",
                                overflowY: "auto",
                                margin: "3%",
                            }}
                        >
                            <div style={{
                                marginTop: "20px",
                            }}>
                                <div style={{ marginLeft: '40%' }}>  List of all corporates</div>
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
                    </div>
                </div>
            </div>
        );
    }
}


const DashboardPage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);

export default DashboardPage;