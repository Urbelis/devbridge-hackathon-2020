MakePaperclip();
BuyWire();
Projects();

Compute();
NewTournament();

LaunchProbe();

function Compute(){
    var qComputing = document.getElementById('qComputing');
    var btnQcompute = document.getElementById('btnQcompute');
    var processors = document.getElementById('processors');
    var qChip0 = document.getElementById('qChip0');
    var qChip1 = document.getElementById('qChip1');
    var qChip2 = document.getElementById('qChip2');
    var qChip3 = document.getElementById('qChip3');
    var qChip4 = document.getElementById('qChip4');
    var qChip5 = document.getElementById('qChip5');
    var qChip6 = document.getElementById('qChip6');
    var qChip7 = document.getElementById('qChip7');
    var qChip8 = document.getElementById('qChip8');
    var qChip9 = document.getElementById('qChip9');

    var autoQcompute;
    var loopListenInterval = 1000;
    var loopAutoInterval = 100;

    console.log('start listen Compute');
    var loopListen = setInterval(listen, loopListenInterval);

    function listen(){
        var display = qComputing.style['display'];
        if (display != 'none'){
            if(loopListen != null){
                console.log('stop listen Compute');
                clearInterval(loopListen);
            }
            console.log('start autoQcompute');
            autoQcompute = setInterval(doWork, loopAutoInterval);
        }
    };

    function doWork(){
        var vChip0 = parseFloat(qChip0.style['opacity']);
        var vChip1 = parseFloat(qChip1.style['opacity']);
        var vChip2 = parseFloat(qChip2.style['opacity']);
        var vChip3 = parseFloat(qChip3.style['opacity']);
        var vChip4 = parseFloat(qChip4.style['opacity']);
        var vChip5 = parseFloat(qChip5.style['opacity']);
        var vChip6 = parseFloat(qChip6.style['opacity']);
        var vChip7 = parseFloat(qChip7.style['opacity']);
        var vChip8 = parseFloat(qChip8.style['opacity']);
        var vChip9 = parseFloat(qChip9.style['opacity']);

        var total = vChip0 + vChip1 + vChip2 + vChip3 + vChip4 +
            vChip5 + vChip6 + vChip7 + vChip8 + vChip9;

        if (total > 0){
            btnQcompute.click();
        }

        var vProcessors = parseInt(processors.innerText);
        if(vProcessors > 400){
            if(autoQcompute != null){
                console.log('stop autoQcompute');
                learInterval(autoQcompute);
            }
        }
    };
};

function NewTournament(){
    var tournamentManagement = document.getElementById('tournamentManagement');
    var btnNewTournament = document.getElementById('btnNewTournament');
    var newTourneyCost = document.getElementById('newTourneyCost');
    var btnRunTournament = document.getElementById('btnRunTournament');
    var stratPicker = document.getElementById('stratPicker');

    var autoNewTournament;
    var loopListenInterval = 1000;
    var loopAutoInterval = 300;

    console.log('start listen NewTournament');
    var loopListen = setInterval(listen, loopListenInterval);

    function listen(){
        var display = tournamentManagement.style['display'];
        var vNewTourneyCost = parseInt(newTourneyCost.innerText.replace(/,/g, ''));
        if (display != 'none' && vNewTourneyCost >= 8000){
            if(loopListen != null){
                console.log('stop listen NewTournament');
                clearInterval(loopListen);
            }

            if(stratPicker.value != '7')
                stratPicker.value = '7'

            console.log('start autoNewTournament');
            autoNewTournament = setInterval(doWork, loopAutoInterval);
        }
    };

    function doWork(){
        if (!btnNewTournament.disabled)
            btnNewTournament.click();
        if (!btnRunTournament.disabled)
            btnRunTournament.click();
    };
};

function LaunchProbe(){
    var spaceDiv = document.getElementById('spaceDiv');
    var probesLaunchedDisplay = document.getElementById('probesLaunchedDisplay');
    var btnMakeProbe = document.getElementById('btnMakeProbe');

    var autoLaunchProbe;
    var loopListenInterval = 1000;
    var loopAutoInterval = 100;

    console.log('start listen LaunchProbe');
    var loopListen = setInterval(listen, loopListenInterval);

    function listen(){
        var display = spaceDiv.style['display'];
        if (display != 'none'){
            if(loopListen != null){
                console.log('stop listen LaunchProbe');
                clearInterval(loopListen);
            }
            console.log('start autoLaunchProbe');
            autoLaunchProbe = setInterval(doWork, loopAutoInterval);
        }
    };

    function doWork(){
        var vProbesLaunchedDisplay = parseInt(probesLaunchedDisplay.innerText.replace(/,/g, ''));
        if(vProbesLaunchedDisplay < 10000){
            if (!btnMakeProbe.disabled)
                btnMakeProbe.click();
        }
        else{
            if(autoLaunchProbe != null){
                console.log('stop autoLaunchProbe');
                clearInterval(autoLaunchProbe);
            }
        }
    };
};

function MakePaperclip(){

    var manufacturingDiv = document.getElementById('manufacturingDiv');
    var clipmakerRate = document.getElementById('clipmakerRate');
    var btnMakePaperclip =  document.getElementById('btnMakePaperclip');

    var autoMakePaperclip;
    var loopListenInterval = 1000;
    var loopAutoInterval = 100;

    console.log('start listen MakePaperclip');
    var loopListen = setInterval(listen, loopListenInterval);

    function listen(){
        var display = manufacturingDiv.style['display'];
        if (display != 'none'){
            if(loopListen != null){
                console.log('stop listen MakePaperclip');
                clearInterval(loopListen);
            }
            console.log('start autoMakePaperclip');
            autoMakePaperclip = setInterval(doWork, loopAutoInterval);
        }
    };

    function doWork(){
        var vClipmakerRate = clipmakerRate.innerText.replace(/,/g, '');

        if(vClipmakerRate.length < 3){
            if (!btnMakePaperclip.disabled)
                btnMakePaperclip.click();
        }
        else{
            if(autoMakePaperclip != null){
                console.log('stop autoMakePaperclip');
                clearInterval(autoMakePaperclip);
            }
        }
    };
};

function BuyWire(){

    var manufacturingDiv = document.getElementById('manufacturingDiv');
    var wireBuyerDiv = document.getElementById('wireBuyerDiv');
    var wire = document.getElementById('wire');
    var btnBuyWire = document.getElementById('btnBuyWire');

    var autoBuyWire;
    var loopListenInterval = 1000;
    var loopAutoInterval = 500;

    console.log('start listen BuyWire');
    var loopListen = setInterval(listen, loopListenInterval);

    function listen(){
        var display = manufacturingDiv.style['display'];
        if (display != 'none'){
            if(loopListen != null){
                console.log('stop listen BuyWire');
                clearInterval(loopListen);
            }
            console.log('start autoBuyWire');
            autoBuyWire = setInterval(doWork, loopAutoInterval);
        }
    };

    function doWork(){
        var vWire = wire.innerText.replace(/,/g, '');
        var displayWireBuyer = wireBuyerDiv.style['display'];

        if(displayWireBuyer == 'none'){
            if (vWire.length < 3 && !btnBuyWire.disabled)
                btnBuyWire.click();
        }
        else{
            if(autoBuyWire != null){
                console.log('stop autoBuyWire');
                clearInterval(autoBuyWire);
            }
        }
    };
};

function Projects(){
    var projectsDiv = document.getElementById('projectsDiv');
    var projectListTop = document.getElementById('projectListTop');


    if (typeof(projectsDiv) != 'undefined' && projectsDiv != null && projectsDiv.style['display'] != 'none'){
        if (typeof(projectListTop) != 'undefined' && projectListTop != null && projectListTop.style['display'] != 'none'){
            var autoMakePaperclip;
            var loopListenInterval = 1000;

            console.log('start listen Projects');
            var loopListen = setInterval(listen, loopListenInterval);

            function listen(){
                var projectButton3 = document.getElementById('projectButton3');

                if (typeof(projectButton3) != 'undefined' && projectButton3 != null && !projectButton3.disabled){
                    console.log(projectButton3);
                    projectButton3.click();
                    if(loopListen != null){
                        console.log('stop listen Projects');
                        clearInterval(loopListen);
                    }
                }
            };
        }
    }
};

// window.setInterval(function(){
// MakeFarm();
// MakeHarvester();
// MakeWireDrone();
// }, 100);


function MakeWireDrone(){
    var wireDroneLevelDisplay = document.getElementById('wireDroneLevelDisplay');
    if (typeof(wireDroneLevelDisplay) != 'undefined' && wireDroneLevelDisplay != null){
        var vWireDroneLevelDisplay = parseInt(wireDroneLevelDisplay.innerText.replace(/,/g, ''));
        var btnWireDronex1000 = document.getElementById('btnWireDronex1000');
        if(vWireDroneLevelDisplay < 2000000){
            btnWireDronex1000.click();
        }
    }
}

function MakeHarvester(){
    var harvesterLevelDisplay = document.getElementById('harvesterLevelDisplay');
    if (typeof(harvesterLevelDisplay) != 'undefined' && harvesterLevelDisplay != null){
        var vHarvesterLevelDisplay = parseInt(harvesterLevelDisplay.innerText.replace(/,/g, ''));
        var btnHarvesterx1000 = document.getElementById('btnHarvesterx1000');
        if(vHarvesterLevelDisplay < 2000000){
            btnHarvesterx1000.click();
        }
    }
}

function MakeFarm(){
    var farmLevel = document.getElementById('farmLevel');
    if (typeof(farmLevel) != 'undefined' && farmLevel != null){
        var vFarmLevel = parseInt(farmLevel.innerText.replace(/,/g, ''));
        var btnFarmx100 = document.getElementById('btnFarmx100');
        if(vFarmLevel < 90000){
            btnFarmx100.click();
        }
    }
};