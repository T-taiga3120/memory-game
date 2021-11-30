$(function(){
    // カードシャッフル
    let cardNumber = 22;
    let questions = [];
    while(questions.length < cardNumber){
        let num = Math.floor(Math.random() * 11 + 1);
        let filterResult = questions.filter(function(n){
            return n === num
        }).length;
        if(filterResult < 2){
            questions.push(num);
        }
    }
    console.log(questions);

    for(let i = 0; i < cardNumber; i++){
        let num = questions[i];
        $(".board").append(`
        <div class="card">
        <img src="images/card-${("00" + num).slice(-2)}.jpg" alt="" class="obverse">
        <img src="images/card_back.png" alt="" class="front">
        </div>
        `);
    }

    //カードをひっくり返す
    // if(cnt < 2 && $(this).find("img").not("answer")){
    let obverse = 0;
    let cnt = 0;
    let opens = [];
    let answer = 0;
    let answers = [];
    $(".card").click(function(event){
        console.log(answers.indexOf($(this).index()));
        if(cnt < 2 && answers.indexOf($(this).index()) === -1){
            $(this).children("img").toggleClass("front")
        }else{
            return;
        }
        // if($(this).find(".obverse").hasClass("front")){
        //     $(this).children("img").toggleClass("front")
        // }
        cnt = $(".obverse.front").length;
        opens.push($(this).index());
        console.log(opens);
        if(cnt === 2){
            if(questions[opens[0]] === questions[opens[1]]){
                console.log("正解");
                // answers.push(opens[0]);
                for(let open of opens){
                    $(".card").eq(open).find("img").toggleClass("obverse")
                    answers.push(open);
                    // $(".card").eq(open).find("img").toggleClass("answer")
                }    
                opens = [];
            }else{
                console.log("不正解");
                setTimeout(function(){
                    for(let open of opens){
                        $(".card").eq(open).find("img").toggleClass("front")
                    }    
                    opens = [];
                },1000)
            }
            cnt = 0;
            
        }
    })

});


    // $(document).on("click",".card",function(event){
    //     if(cnt < 2){
    //         $(this).children("img").toggleClass("front")
    //     }else if($(this).children("img").eq(obverse).hasClass("front")){
    //         $(this).children("img").toggleClass("front")
    //     }
    //     cnt = $(".obverse.front").length;
    // });
