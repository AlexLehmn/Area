import React, { useState } from 'react';
import "./Modal.css";
import reddit_logo from '../Assets/reddit_logo.png'
import twitter_logo from '../Assets/twitter_logo.png'
import discord_logo from '../Assets/discord_logo.png'
import github_logo from '../Assets/github_logo.png'
import mail_logo from '../Assets/mail_logo.png'
import question_logo from '../Assets/question.png'
import axios from 'axios';
import { useCookies } from 'react-cookie'

window.name = ""

const Reddit = (setredditsetup) => {
    window.name = "reddit"
    return (
        <div className='Reddit'>
            <h4>Name of Subreddit</h4>
            <input type="text" placeholder="Subreddit..." onChange={(e) => {
                setredditsetup(e.target.value);
            }} />
        </div>
    );
};

const Github = (setGithubOwner, setGithubrepos) => {
    window.name = "github"
    return (
        <div className='Github'>
            <div id='github_1'>
                <h4>Name of Account</h4>
                <input type="text" placeholder="Owner..." onChange={(e) => {
                    setGithubOwner(e.target.value);
                }} />
            </div>
            <div>
                <h4>Name of Repository</h4>
                <input type="text" placeholder="Repository..." onChange={(e) => {
                    setGithubrepos(e.target.value);
                }} />
            </div>
        </div>
    );
};

const Twitter = (settwetuser) => {
    window.name = "twitter"
    return (
        <div className='Twitter'>
            <h4>Name of User</h4>
            <input type="text" placeholder="Username..." onChange={(e) => {
                settwetuser(e.target.value);
            }} />
        </div>
    );
};

const Discord = (setchannelDis, channelDis) => {
    return (
        <div className='Discord'>
            <h4>ID Channel</h4>
            <input type="text" placeholder="ID..." onChange={(e) => {
                setchannelDis(e.target.value);
            }} />
        </div>
    );
};

const Mail = (setmailrec) => {
    return (
        <div className='Mail'>
            <h4>E-Mail</h4>
            <input type="text" placeholder="mail..." onChange={(e) => {
                setmailrec(e.target.value);
            }} />
        </div>
    );
};

function Modal({ setOpenModal }) {


    const [action_var, SetAction] = useState("");
    const [reaction_var, SetReaction] = useState("");
    const [redditsetup, setredditsetup] = useState('');
    const [githubOwner, setGithubOwner] = useState('');
    const [githubrepos, setGithubrepos] = useState('');
    const [twetuser, settwetuser] = useState('');
    const [channelDis, setchannelDis] = useState('');
    const [mailrec, setmailrec] = useState('');

    const [cookies, setCookie] = useCookies(["user"]);

    var bodyParams = {
        action: action_var,
        reaction: reaction_var,
        service: window.name,
        username: cookies.user,
    };

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const DiscordBtn = () => {
        return (
            <button onClick={() => {
                SetUpService(bodyParams);
                setOpenModal(false);
                openInNewTab("https://discord.com/api/oauth2/authorize?client_id=1028320865009532969&permissions=286152272896&scope=bot")
            }}>CREATE</button>
        );
    }

    const BtnClassic = () => {
        return (
            <button onClick={() => {
                SetUpService(bodyParams);
                setOpenModal(false);
            }}>CREATE</button>
        )
    }

    const ButtonFct = (reaction_var) => {
        if (reaction_var === "messageDiscord")
            return DiscordBtn()
        else
            return BtnClassic()
    };

    const SetUpService = (bodyParams) => {
        switch (window.name) {
            case "reddit":
                bodyParams.subreddit = redditsetup
                break;
            case "github":
                bodyParams.owner = githubOwner
                bodyParams.repos = githubrepos
                break;
            case "twitter":
                bodyParams.tweeterUser = twetuser
                break;
            default:
                break;
        }
        bodyParams.channelID = channelDis
        bodyParams.receiver = mailrec
        axios.post('http://localhost:8080/setup-area', bodyParams)
            .then((response) => {
                console.log('http://localhost:8080/setup-area')
                console.log('params :')
                console.log(bodyParams)
                console.log('response :')
                console.log(response)
                if (response.error) {
                    <h1>error</h1>
                }
            })
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                </div>
                <div className="title" id='realtitle'>
                    <h1 id='real_title'>Settings do create your service</h1>
                </div>
                <div className="body">
                    <h1>Choose an Action</h1>
                    {(() => {
                        switch (action_var) {
                            case 'newPost':
                                return <img className='logo_action' src={reddit_logo} alt="Logo" />;
                            case 'topPost':
                                return <img className='logo_action' src={reddit_logo} alt="Logo" />;
                            case 'topPostToday':
                                return <img className='logo_action' src={reddit_logo} alt="Logo" />;
                            case 'newPullRequest':
                                return <img className='logo_action' src={github_logo} alt="Logo" />;
                            case 'newPush':
                                return <img className='logo_action' src={github_logo} alt="Logo" />;
                            case 'newIssue':
                                return <img className='logo_action' src={github_logo} alt="Logo" />;
                            case 'newTweet':
                                return <img className='logo_action' src={twitter_logo} alt="Logo" />;
                            default:
                                return <img className='logo_action' src={question_logo} alt="Logo" />;
                        }
                    })()}
                    <select id='SelectorAction' value={action_var} onChange={e => SetAction(e.target.value)}>
                        <option value="" selected disabled hidden>ACTION</option>
                        <option>newPost</option>
                        <option>topPost</option>
                        <option>topPostToday</option>
                        <option>newPullRequest</option>
                        <option>newPush</option>
                        <option>newIssue</option>
                        <option>newTweet</option>
                    </select>
                </div>
                <div className="body">
                    <h1>Choose a Reaction</h1>
                    {(() => {
                        switch (reaction_var) {
                            case 'messageDiscord':
                                return <img className='logo_action' src={discord_logo} alt="Logo" />;
                            case 'sendMail':
                                return <img className='logo_action' src={mail_logo} alt="Logo" />;
                            default:
                                return <img className='logo_action' src={question_logo} alt="Logo" />;
                        }
                    })()}
                    <select id='SelectorReaction' value={reaction_var} onChange={e => SetReaction(e.target.value)}>
                        <option value="" selected disabled hidden>REACTION</option>
                        <option>messageDiscord</option>
                        <option>sendMail</option>
                    </select>
                </div>
                <div className="title">
                    {(() => {
                        switch (action_var) {
                            case 'newPost':
                                return <h1>Setup for Reddit</h1>;
                            case 'topPost':
                                return <h1>Setup for Reddit</h1>;
                            case 'topPostToday':
                                return <h1>Setup for Reddit</h1>;
                            case 'newPullRequest':
                                return <h1>Setup for Github</h1>;
                            case 'newIssue':
                                return <h1>Setup for Github</h1>;
                            case 'newTweet':
                                return <h1>Setup for Twitter</h1>;
                            default:
                                return <h1>Setup for Action</h1>;
                        }
                    })()}
                    {(() => {
                        switch (action_var) {
                            case 'newPost':
                                return Reddit(setredditsetup);
                            case 'topPost':
                                return Reddit(setredditsetup);
                            case 'topPostToday':
                                return Reddit(setredditsetup);
                            case 'newPullRequest':
                                return Github(setGithubOwner, setGithubrepos);
                            case 'newPush':
                                return Github(setGithubOwner, setGithubrepos);
                            case 'newIssue':
                                return Github(setGithubOwner, setGithubrepos);
                            case 'newTweet':
                                return Twitter(settwetuser);
                            default:
                                return null;
                        }
                    })()}
                </div>
                <div className="title">
                    {(() => {
                        switch (reaction_var) {
                            case 'messageDiscord':
                                return <h1>Setup for Discord</h1>;
                            case 'sendMail':
                                return <h1>Setup for Mail</h1>;
                            default:
                                return <h1>Setup for Reaction</h1>;
                        }
                    })()}
                    {(() => {
                        switch (reaction_var) {
                            case 'messageDiscord':
                                return Discord(setchannelDis);
                            case 'sendMail':
                                return Mail(setmailrec);
                            default:
                                return null;
                        }
                    })()}
                </div>
                <div className="footer">
                    {ButtonFct(reaction_var)}
                </div>
            </div>
        </div>
    );
}

export default Modal;