import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { addCorporate, updateCorporate, corporateData } from '../../redux/actions';

function mapDispatchToProps(dispatch) {
    return {
        addCorporateAction: (details) => dispatch(addCorporate(details)),
        updateCorporateAction: (details, id) => dispatch(updateCorporate(details, id)),
        corporateDataAction: (data, actionPerform) => dispatch(corporateData(data, actionPerform)),
    };
}

const mapStateToProps = state => {
    return {
        addResponse: state.addResponse,
        corporatesResult: state.corporatesResult,
    };
};

class AddCorporation extends Component {

    constructor() {
        super();
        console.log('cons')
        this.state = {
            name: '',
            address: '',
            pincode: '',
            phone1: '',
            phone2: '',
            email1: '',
            email2: '',
            userlimit: '',
            isRedirect: false,
            buttonName: 'Add',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentWillMount() {
        const { corporatesResult } = this.props;
        console.log('hello')
        if (corporatesResult && corporatesResult.data) {
            let data = corporatesResult.data;
            await this.setState({
                name: data.name,
                address: data.address,
                pincode: data.pincode,
                phone1: data.phone1,
                phone2: data.phone2,
                email1: data.email1,
                email2: data.email2,
                userlimit: data.userlimit,
                buttonName: corporatesResult.actionPerform
            })
        }
    }

    handleChange(event) {
        event.persist();
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = () => {
        const { name, address, email1, email2, phone1, phone2, pincode, userlimit, buttonName } = this.state;
        const { addCorporateAction, corporatesResult, updateCorporateAction } = this.props;
        const details = {
            name,
            address,
            email1,
            email2,
            phone1,
            phone2,
            pincode,
            userlimit
        }
        if (buttonName === 'Add') {
            addCorporateAction(details).then(() => {
                const { addResponse } = this.props;
                if (addResponse && addResponse.status === 'sucess') {
                    this.setState({ isRedirect: true })
                }
            })
        }
        else if (buttonName === 'Update') {
            const id = corporatesResult.data.id;
            updateCorporateAction(details, id).then(() => {
                const { addResponse } = this.props;
                if (addResponse && addResponse.status === 1) {
                    this.setState({ isRedirect: true })
                }
            })
        }

    }

    componentWillUnmount() {
        console.log('call')
        corporateData([], 'Add');
    }

    render() {
        const { name, address, email1, email2, phone1, phone2, pincode, userlimit, isRedirect, buttonName } = this.state;
        if (isRedirect) {
            return <Redirect to="/Dashboard" />;
        }
        return (
            <div style={{ margin: '20px' }}>
                <Form>
                    <Form.Group as={Row} controlId="name">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Name" value={name} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="address">
                        <Form.Label column sm="2">
                            Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Address" value={address} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="pincode">
                        <Form.Label column sm="2">
                            Pincode
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Pincode" type='text' value={pincode} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="phone1">
                        <Form.Label column sm="2">
                            Phone1
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Phone1" type='text' value={phone1} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="phone2">
                        <Form.Label column sm="2">
                            Phone2
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Phone2" type='text' value={phone2} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="email1">
                        <Form.Label column sm="2">
                            Email1
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Email1" type='text' value={email1} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="email2">
                        <Form.Label column sm="2">
                            Email2
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Email2" type='text' value={email2} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="userlimit">
                        <Form.Label column sm="2">
                            Userlimit
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Userlimit" type='number' value={userlimit} onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} align="center">
                        <Col>
                            <Button
                                type="button"
                                onClick={() => this.handleSubmit()}
                                className="btn btn-primary btn-fill btn-wd"
                            >
                                {buttonName}
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}


const AddCorporationPage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddCorporation)
);

export default AddCorporationPage;