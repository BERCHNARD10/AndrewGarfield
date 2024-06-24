/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
en: {
    translation: {
        WELCOME_MESSAGE: 'Hello! Thank you for using Andrew Garfield trivia. To start, you can say: mention: tell me a fun fact about Andrew Garfield ... or if you want me to stop, just say, Cancel! ... So, how can I help you?',
        GET_FRASES_MSG: 'A fun fact about Andrew Garfield is: ...',
        HELLO_MESSAGE: 'Hello world',
        HELP_MESSAGE: 'You can say hello to me. How can I help you?',
        GOODBYE_MESSAGE: 'Goodbye!',
        REFLECTOR_MESSAGE: 'You just activated %s',
        FALLBACK_MESSAGE: 'Sorry, I don’t know about that. Please try again.',
        ERROR_MESSAGE: 'Sorry, there was a problem. Please try again.',
        GET_MESSAGE2: 'You can ask for another fun fact ... mention: explain an important fact about Andrew Garfield... or if you want me to stop, just say, Cancel! ... How can I help you?',
        FRASES_DATA: [
            'He is an Anglo-American actor born on August 20, 1983, in Los Angeles, California.',
            'He is known for his roles in films such as "The Social Network," where he played Eduardo Saverin, and "The Amazing Spider-Man," where he portrayed Peter Parker.',
            'He has received acclaim for his work in theater, including a notable performance in the play "Angels in America."',
            'In 2016, he was nominated for an Academy Award for Best Actor for his role in "Hacksaw Ridge," directed by Mel Gibson.',
            'He won a Tony Award in 2018 for his performance in the play "Angels in America."',
            'Garfield has been involved in various charitable causes and is known for his support of LGBTQ+ rights.',
            'In addition to his film and theater work, he has been praised for his versatility and commitment to his characters.',
            'He holds both British and American citizenship, allowing him to work in productions in both Hollywood and the United Kingdom.'
        ]
    }
},
es: {
    translation: {
        WELCOME_MESSAGE: '¡Hola! gracias por usar curiosidades de Andrew Garfield, para comenzar puedes decir: menciona: dime un dato curioso sobre Andrew Garfield ... o si deseas detenerme solo di, ¡Cancela! ... entonces ¿cómo te puedo ayudar?',
        GET_FRASES_MSG:'Un dato curioso de Andrew Garfield es:  ...',
        HELLO_MESSAGE: 'hola mundo',
        HELP_MESSAGE: 'Puedes decirme hola. Cómo te puedo ayudar?',
        GOODBYE_MESSAGE: 'Adiós!',
        REFLECTOR_MESSAGE: 'Acabas de activar %s',
        FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
        ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
        GET_MESSAGE2: 'puedes pedir otro dato curioso ... menciona: explicame un dato importante sobre Andrew Garfield... o si deseas detenerme solo di, ¡Cancela! ... ¿cómo te puedo ayudar?',
        FRASES_DATA: [
            'Es un actor anglo-estadounidense nacido el 20 de agosto de 1983 en Los Ángeles, California.',
            'Es conocido por sus interpretaciones en películas como "The Social Network", donde interpretó a Eduardo Saverin, y "The Amazing Spider-Man", donde interpretó a Peter Parker.',
            'Ha recibido elogios por su trabajo en el teatro, incluyendo una destacada actuación en la obra "Angels in America".',
            'En 2016, fue nominado al Premio de la Academia al Mejor Actor por su papel en "Hacksaw Ridge", dirigida por Mel Gibson.',
            'Ganó un premio Tony en 2018 por su interpretación en la obra "Angels in America".',
            'Garfield ha participado en diversas causas benéficas y es conocido por su apoyo a los derechos LGBTQ+.',
            'Además de su trabajo en el cine y el teatro, ha sido elogiado por su versatilidad y compromiso con sus personajes.',
            'Tiene la nacionalidad británica y estadounidense, lo que le permite trabajar en producciones tanto en Hollywood como en el Reino Unido.'
        ]
    }
}
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const frasesArray = requestAttributes.t('FRASES_DATA');
        
        const frasesIndice = Math.floor(Math.random() * frasesArray.length);
        const randomFrase = frasesArray[frasesIndice];
        const speakOutput = `${requestAttributes.t('GET_FRASES_MSG')} ${randomFrase} ... ${requestAttributes.t('GET_MESSAGE2')}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
 
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();