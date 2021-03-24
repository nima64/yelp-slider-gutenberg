function SliderBullets(){
    return(
        <div className="glide__bullets lg:hidden" data-glide-el="controls[nav]">
            <button className="glide__bullet border-dark" data-glide-dir="=0"></button>
            <button className="glide__bullet border-dark" data-glide-dir="=1"></button>
            <button className="glide__bullet border-dark" data-glide-dir="=2"></button>
        </div>
    );
}

function ReviewCard({info}){
    return(
        <div class="" >
            <img class=""src={info.user.image_url} alt="" style={{objectFit:"cover",height:"175px"}}/>
            <div class="">
                <p class="">"{info.text}"</p>
                <a href={info.url} class="">readmore</a>
            </div>
            <span class="">{info.user.name}</span> 
        </div>
    );
}

function Slider({cardsData,Card}){
    return (
        <div className="glide" style={{backgroundColor:'white',border:'1px solid black'}}>
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides" style={{listStyle:'none',padding:'0px'}}>
                    {
                    cardsData.map((v)=>(
                        <li className='glide__slide'>
                            <Card info={v}/>
                            {/* PASS component here  */}
                        </li>
                    ))
                    }
                </ul>
            </div>
            <SliderBullets />
        </div>
    )
}

export class ReviewSlider extends React.Component{
    constructor(props){
        super(props);
        this.cardsData = props.cardsData;
        console.log(`heres the reviews`,this.cardsData);
    }

    componentDidMount(){
        const glideW = document.body.querySelector('.glide').offsetWidth;
        const getPerView = (width) =>{
            if (width > 700){
                return 3;
            }else if (width > 400){
                return 2;
            }else {
                return 1;
            }
        }
        const glideSetup = (width) => {
            var glide = new Glide('.glide',{
                perView:getPerView(width),
            }).mount();
            window.addEventListener('resize', function(){
                glide.update({perView:getPerView(width)})
            })
        }
        glideSetup(glideW);
    }

    render(){
        return(
            <Slider cardsData={this.cardsData} Card={ReviewCard} />
        )
    }
}
