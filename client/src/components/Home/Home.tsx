import React, {Component} from 'react'
import './Home.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {TrendzButton} from "../common/TrendzButton/TrendzButton";
import ReactPaginate from "react-paginate";
import {parseJwt} from "../Routing/utils";
import {MdDelete} from 'react-icons/md';
import Modal from "react-modal";
import {deleteTopic, getTopics} from "../../api/TopicApi";
import {Topic} from "../types/types";

export type Props = RouteComponentProps<any> & {}

export type State = {
    topics: Topic[],
    showModal: boolean,
    selectedTopic: number
    currentPage: number
}

class Home extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTopic: -1,
            showModal: false,
            topics: [],
            currentPage: 0
        }
    };

    componentDidMount() {
        this.getTopics()
    }

    getTopics() {
        getTopics().then(res => this.setState({topics: res}))
    }

    createTopic = () => {
        this.props.history.push('createTopic');
    }

    handleCancel = () => {
        this.setState({showModal: false})
    }

    handleConfirm = () => {
        deleteTopic(this.state.selectedTopic).then(() => this.getTopics())
        this.setState({selectedTopic: -1})
        this.handleCancel()
    }

    handleDelete = (id: number) => {
        this.setState({selectedTopic: id, showModal: true})
    }

    renderTopics = (currentPage: number) => {
        return this.state.topics.slice(currentPage*8, currentPage*8+8)
    }

    handlePageClick = (data: {selected: number}) => {
        this.setState({currentPage: data.selected})
    }

    handleTopicSelection = (topic: Topic) => {
        this.props.history.push('/main/topic', {topic: topic})
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
                            <span>{'You are about to delete the topic ' + this.state.topics.filter(topic => topic.id === this.state.selectedTopic)[0].title + '.'}</span>
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
                        <TrendzButton title={'Create topic'} onClick={() => this.props.history.push('/main/createTopic')}/>
                    }
                </div>
                <div className={'topics-container'}>
                    {
                        this.state.topics.length &&
                        this.renderTopics(this.state.currentPage).map((topic, index) => (
                            <div className={'card-wrapper'} key={index}>
                                <div className={'topic-card'} onClick={() => this.handleTopicSelection(topic)}>
                                    <div className={'topic-header'}>
                                        {topic.title}
                                        {
                                            parseJwt(localStorage.getItem('token')).role.includes('ROLE_ADMIN') &&
                                            <MdDelete
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.handleDelete(topic.id);
                                                }}
                                                size={20}
                                                className={'delete-icon'}
                                            />
                                        }
                                    </div>
                                    <div className={'topic-divider'}/>
                                    <div className={'topic-body'}>
                                        {
                                            topic.description ?
                                                topic.description :
                                                'No description provided'
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={'home-footer'}>
                    <ReactPaginate
                        onPageChange={this.handlePageClick}
                        pageCount={this.state.topics.length/8}
                        pageRangeDisplayed={8}
                        marginPagesDisplayed={2}
                        previousLabel={"<"}
                        nextLabel={">"}
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
