import React, {Component} from 'react'
import './Home.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {TrendzButton} from "../common/TrendzButton/TrendzButton";
import glasses from '../../assets/glasses.png';
import ReactPaginate from "react-paginate";
import {parseJwt} from "../Routing/utils";
import {Icon} from "react-icons-kit";
import {trash} from 'react-icons-kit/fa/trash';
import Modal from "react-modal";

export type Props = RouteComponentProps<any> & {}

export type State = {
    topics: {id: number, title: string, description: string}[],
    showModal: boolean,
    selectedTopic: number
}

class Home extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTopic: -1,
            showModal: false,
            topics: [
                {id: 0, title: 'Humor', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
                {id: 1, title: 'Humor', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
                {id: 2, title: 'Humor', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
                {id: 3, title: 'Humor', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
                {id: 4, title: 'Humor', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
            ]
        }
    };

    createTopic = () => {
        this.props.history.push('createTopic');
    }

    handleCancel = () => {
        this.setState({showModal: false})
    }

    handleConfirm = () => {

    }

    handleDelete = (id: number) => {
        this.setState({selectedTopic: id, showModal: true})
    }

    render() {
        return (
            <div className={'home-container'}>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCancel.bind(this)}
                    shouldCloseOnOverlayClick={true}
                    className={'modal'}
                    overlayClassName={'overlay'}
                >
                    <div className={'modal-text'}>
                        {
                            this.state.selectedTopic !== -1 &&
                            <span>{'You are about to delete the topic ' + this.state.topics[this.state.selectedTopic].title + '.'}</span>
                        }
                        <span>This action is irreversible, </span>
                        <span>do you wish to continue?</span>
                    </div>
                    <div className={'modal-buttons'}>
                        <TrendzButton title={'Confirm'} onClick={this.handleConfirm.bind(this)}/>
                        <TrendzButton title={'Cancel'} color={'#DF6052'} onClick={this.handleCancel.bind(this)}/>
                    </div>
                </Modal>
                <div className={'home-header'}>
                    <div className={'header-text'}>
                        <span className={'home-title'}>Topics</span>
                        <span className={'home-subtitle'}>Here you can find every topic and read more about those that interest you.</span>
                    </div>
                    {
                        parseJwt(localStorage.getItem('token')).role.includes('ROLE_ADMIN') &&
                        <TrendzButton title={'Create topic'} onClick={() => this.createTopic()}/>
                    }
                </div>
                <div className={'topics-container'}>
                    {
                        this.state.topics.length &&
                        this.state.topics.map((topic) => (
                            <div className={'topic-card'}>
                                <div className={'topic-header'}>
                                    {topic.title}
                                    {
                                        parseJwt(localStorage.getItem('token')).role.includes('ROLE_ADMIN') &&
                                        <Icon
                                            icon={trash}
                                            onClick={() => this.handleDelete(topic.id)}
                                            size={20}
                                            className={'delete-icon'}
                                        />
                                    }
                                </div>
                                <div className={'topic-divider'}/>
                                <div className={'topic-body'}>
                                    {topic.description}
                                </div>
                                <div className={'topic-footer'}>
                                    {/* onClick to navigate to topic */}
                                    <img src={glasses} alt={''} onClick={() => null}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={'home-footer'}>
                    <ReactPaginate
                        pageCount={10}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        previousLabel={"<< Previous"}
                        nextLabel={"Next >>"}
                        breakLabel={'...'}
                        containerClassName={"pagination"}
                        previousLinkClassName={"previous_page"}
                        nextLinkClassName={"next_page"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Home);
