from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from time import time, process_time

from ..models.usersArticle import ResponseModel, ErrorResponseModel
from ..database import (
    get_user,
    update_user,
    get_articles,
    get_hot_articles,
    add_article
)
from .preprocess import word_preprocess
from .summary import summarize

class User(BaseModel):
    # user_id: str
    email: str
    link: str | None = None

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

text = '''Speakers ranging from artificial intelligence (AI) developers to law firms grappled this week with questions about the efficacy and ethics of AI during MIT Technology Review's EmTech Digital conference. Among those who had a somewhat alarmist view of the technology (and regulatory efforts to rein it in) was Tom Siebel, CEO C3 AI and founder of CRM vendor Siebel Systems.

Siebel was on hand to talk about how businesses can prepare for an incoming wave of AI regulations, but in his comments Tuesday he touched on various facets of the debate of generative AI, including the ethics of using it, how it could evolve, and why it could be dangerous.

For about 30 minutes, MIT Technology Review Editor-in-Chief Mat Honan and several conference attendees posed questions to Siebel, beginning with what are the ethical and unethical uses of AI. The conversation quickly turned to AI’s potential to cause damage on a global scale, as well as the nearly impossible task of setting up guardrails against its use for unintended and intended nefarious purposes.

[ Related: How AI is helping the help desk ]
The following are excerpts from that conversation.

[Honan] What is ethical AI, what are ethical uses of AI or even unethical uses of AI? "The last 15 years we’ve spent a couple billion dollars building a software stack we used to design, develop, provision, and operate at massive scale enterprise predictive analytics applications. So, what are applications of these technologies I where I don’t think we have to deal with bias and we don’t have ethical issues?

"I think anytime we’re dealing with physical systems, we’re dealing with pressure, temperature, velocity, torque, rotational velocity. I don’t think we have a problem with ethics. For example, we’re…using it for one of the largest commercial applications for AI, the area of predictive maintenance.

"Whether it’s for power generation and distribution assets in the power grid or predictive maintenance for offshore oil rigs, where the data are extraordinarily large data sets we’re arriving at with very rapid velocity, ...we’re building machine-learning models that are going to identify device failure before it happens — avoiding a failure of, say, an offshore oil rig of Shell. The cost of that would be incalculable. I don’t think there are any ethical issues. I think we can agree on that.

[ REGISTER NOW for May 11, in-person event, FutureIT Washington, D.C.: Building the Digital Business with Cloud, AI and Security ]
"Now, anytime we get to the intersection of artificial intelligence and sociology, it gets pretty slippery, pretty fast. This is where we get into perpetuating cultural bias. I can give you specific examples, but it seems like it was yesterday — it was earlier this year — that this business came out of generative AI. And is generative AI an interesting technology? It’s really an interesting technology. Are these large language models important? They’re hugely important.

"Now all of a sudden, somebody woke up and found, gee, there are ethical situations associated with AI. I mean, people, we’ve had ethical situations with AI going back many, many years. I don’t happen to have a smartphone in my pocket because they striped it from me on the way in, but how about social media? Social media may be the most destructive invention in the history of mankind. And everybody knows it. We don’t need ChatGPT for that.

"So, I think that’s absolutely an unethical application of AI. I mean we’re using these smartphones in everybody’s pocket to manipulate two to three billion people at the level of the limpid brain, where we’re using this to regulate the release of dopamine. We have people addicted to these technologies. We know it causes an enormous health problem, particularly among young women. We know it causes suicide, depression, loneliness, body image issues – documented. We know these systems are the primary exchange for the slave trade in the Middle East and Asia. These systems call in to question our ability to conduct a free and open Democratic society.

"Does anyone have an ethical problem with that? And that’s the old stuff. Now we get into the new stuff."

Siebel spoke about government requests made of his company. "Where have I [seen] problems that we’ve been posed? OK. So, I’m in Washington DC. and I won’t say in whose office or what administration, but it’s a big office. We do a lot of work in the Beltway, in things like contested logistics, AI predictive maintenance for assets in the United States Air Force, command-and-control dashboards, what have you, for SOCOM [Special Operations Command], TransCom [Transportation Command], National Guard, things like this.

"And, I’m in this important office and this person turns his office over to his civilian advisor who’s a PhD in behavioral psychology…, and she starts asking me these increasingly uncomfortable questions. The third question was, ‘Tom, can we use your system to identify extremists in the United States population.’

"I’m like holy moly; what’s an extremist? Maybe a white male Christian? I just said, 'I’m sorry, I don’t feel comfortable with this conversation. You’re talking to the wrong people. And this is not a conversation I want to have.' Now, I have a competitor who will do that transaction in a heartbeat.

"Now, to the extent we have the opportunity to do work for the United States government, we do so. I’m in a meeting — not this administration — but with the Undersecretary of the Army in California, and he says, ‘Tom, we want to use your system to build an AI-based human resource system for the Department of the Army.'

"I said, 'OK, tell me what the scale of this system is.' The Department of the Army is about a million and a half people by the time you get into the reserves. I said, 'What is this system going to do?' He says we’re going to make decisions about who to assign to a billet and who to promote. I said, 'Mr. Secretary, this is a really bad idea. The problem is, yes we can build the system, and yes we can have it at scale of the Department of the Army say in six months. The problem is we have this thing in the data called cultural bias. The problem is no matter what the question is, the answer is going to be: white, male, went to West Point.’

"In 2020 or 2021 — whatever year it was -- that’s just not going to fly. Then we’ve got to read about ourselves on the front page of The New York Times; then we’ve got to get dragged before Congress to testify, and I’m not going with you.

"So, this is what I’d describe as the unethical use of AI."

Siebel also spoke about AI's use in predictive healthcare. "Let’s talk about one I’m particularly concerned about. The largest commercial application of AI – hard stop – will be precision health. There’s no question about that.

"There’s a big project going on in the UK, right now, which may be on the order of 400 million pounds. There’s a billion dollar project going on in the [US] Veterans Administration. An example of precision medicine ... [would be to] aggregate the genome sequences and the healthcare records of the population of the UK or the United States or France, or whatever nation it may be…, and then build machine-learning models that will predict with very high levels of precision and recall who’s going to be diagnosed with what disease in the next five years.

"This is not really disease detection; this is disease prediction. And this gives us the opportunity to intervene clinically and avoid the diagnosis. I mean, what could go wrong? Then we combine that with the cellphone, where we can reach previously underserved communities and in the future every one of us and how many people have devices emitting telemetry? Heart arrhythmia, pulse, blood glucose levels, blood chemicals, whatever it may be.

"We have these devices today and we’ll have more of them in the future. We’ll be able to provide medical care to largely underserved [people]…, so, net-net we have a healthier population, we’re delivering more efficacious medicine… at a lower cost to a larger population. What could go wrong here? Let’s think about it.

"Who cares about pre-existing conditions when we know what you’ll diagnosed with in the next five years. The idea that it won’t be used to set rates — get over it, because it will.

"Even worse, it doesn’t matter which side of the fence you’re on. Whether you believe in a single-care provider or a quasi-free market system like we have in the United States. The idea that this government entity or this private sector company is going to act beneficially, you can get over that because they’re not going to act beneficially. And these systems absolutely –— hard stop — will be used to ration healthcare. They’ll be used in the Unites States; they’ll be used in the UK; they’ll be used in the Veterans Administration. I don’t know if you find that disturning, but I do.

"Now, we ration healthcare today…, perhaps in an equally horrible way, but this strikes me as a particularly horrible use of AI."

[Honan] There’s a bill [in California] that would do things to try to combat algorithmic discrimination, to inform consumers that AI has been used in a decision-making process. There’s other things happening in Europe with data collection. People have been talking about algorithmic bias for a long time now. Do you think this stuff will become effectively regulated, or do you think it’s just going to be out there in the wild? These things are coming but do you think this shouldn't be regulated? "I think that when we’re dealing with AI, where it is today and where it’s going, we’re dealing with something extraordinarily powerful. This is more powerful than the steam engine. Remember, the steam engine brought us the industrial revolution, brought us World War I, World War II, communism.

"This is big. And, the deleterious consequences of this are just terrifying. It makes an Orwellian future look like the Garden of Eden compared to what is capable of happening here.

"We need to discuss what the implications of this are. We need to deal with the privacy implications. I mean, pretty soon it’s going to be impossible to determine the difference between fake news and real news.

"It might be very difficult to carry on a free and open democratic society. This does need to be discussed. It needs to be discussed in the academy. It needs to be discussed in government.

"Now, the regulatory proposals that I’ve seen are kind of crazy. We’ve got this current proposal that everybody’s aware of from a senior senator from New York [Senate Majority Leader Chuck Schumer, D-NY] where we’re basically going to form a regulatory agency that’s going to approve and regulate [AI] algorithms before they can be published. Someone tell me in this room where we draw the line between AI and not AI. I don’t think there’s any two of us who will agree.

"We’re going to set up something like a federal algorithm association to whom we’re going to submit our algorithms for approval? How many millions of algorithms — hundreds of millions? — are generated in the United States every day. We’re basically going to criminalize science. Or, we’re forcing all science outside the United States. That’s just whacked.

"The other alternatives are — and I don’t want to take any shots at this guy because I think he may be one of the smartest people on the planet — but this idea that we’re going to stop research for six months? I mean c’mon. You’re going to stop research at MIT for six months? I don’t think so. You’re going to stop research in Shanghai — in Beijing — for six months? No way, no how.

"I just haven’t heard anything that makes any sense. Do we need to have dialogue? Are these dialogues we’re having here important? They’re critically important. We need to get in the room and we need to agree; we need to disagree; we need to fight it out. Whatever the solutions are, they’re not easy."

Before we see anything federal happening here…, is there a case that the industry should be leading the charge on regulation? "There is a case, but I’m afraid we don’t have a very good track record there; I mean, see Facebook for details. I’d like to believe self-regulation would work, but power corrupts and absolute power corrupts absolutely.

"What has happened in social media in the last decade, these companies have not regulated themselves. They’ve done enormous damage to billions of people around the world."

I’ve been in healthcare for a long time. You mentioned regulations round AI. Different institutions in healthcare, they don’t even understand HIPPA. How are we going to migrate an AI regulation in healthcare? "We can protect the data. HIPPA was one of the best data protection laws out there. That’s not a difficult problem — to be HIPPA compliant.

[Audience member] Do you foresee C3 AI implementing generative AI on top of...the next [enterprise application] that’s going to show up and how do I solve that? "We’re using generative AI for pre-trained generative transformers and these large language models for a non-obvious use. We’re using it to fundamentally change the nature of the human-computer interface for enterprise application software.

"Over the last 50 years, from IBM hologram cards to Fortran…to Windows devices to PCs, if you look at the human-computer iteration model for ERP systems, for CRM systems, for manufacturing systems..., they’re all kind of equally dreadful and unusable.'''


@router.get("/")
async def read_user_articles(email:str):
    user_articles = await get_articles(email)
    return user_articles

#todo: 중복 체크
@router.post("/")
async def add_user_article(user:User):
    # start_time = process_time()
    start_time = time()
    # 기사 히스토리에 추가
    title, image, keyword = word_preprocess(user.link)
    summary = summarize(text)

    article = {
        "link": user.link,
        "datetime": datetime.now(),
        "title": title,
        "image": image,
        "cnt": 1,
        "summary": summary,
        "description": summary[0], # og_description으로 수정
        "categories": [keyword]
    }
    article_id = await add_article(article)

    # 유저 히스토리에 추가
    updateRes = await update_user(user.email, article_id)
    # end_time = process_time()
    end_time = time()
    print("time: ", end_time - start_time)
    return ResponseModel(article_id, "Article added successfully.")