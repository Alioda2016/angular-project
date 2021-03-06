import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartyColumnNamesService {

  constructor() { }

  public static getColumnNames(){
     return ['PARTY_NUMBER', 'PARTY_TYPE_DESC', 'PARTY_TAX_ID', 'PARTY_TAX_ID_TYPE_CODE',
      'PARTY_IDENTIFICATION_ID', 'PARTY_IDENTIFICATION_TYPE_DESC', 'PARTY_ID_STATE_CODE', 
      'PARTY_ID_COUNTRY_CODE', 'PARTY_DATE_OF_BIRTH', 'PARTY_FIRST_NAME', 'PARTY_LAST_NAME', 'PARTY_MIDDLE_NAME', 
      'PARTY_NAME', 'DOING_BUSINESS_AS_NAME', 'PARTY_STATUS_DESC', 'ULTIMATE_PARENT_NAME', 'MATCH_CODE_ORGANIZATION', 
      'MATCH_CODE_INDIVIDUAL', 'MATCH_CODE_STREET_ADDRESS', 'MATCH_CODE_MAILING_ADDRESS',
       'MATCH_CODE_STREET_ADDR_LINES', 'MATCH_CODE_STREET_CITY', 'MATCH_CODE_STREET_STATE',
        'MATCH_CODE_STREET_COUNTRY', 'MATCH_CODE_MAILING_ADDR_LINES', 'MATCH_CODE_MAILING_CITY',
         'MATCH_CODE_MAILING_STATE', 'MATCH_CODE_MAILING_COUNTRY', 'STREET_ADDRESS_1', 'STREET_ADDRESS_2', 
         'STREET_CITY_NAME', 'STREET_STATE_CODE', 'STREET_STATE_NAME', 'STREET_POSTAL_CODE', 'STREET_COUNTRY_CODE',
          'STREET_COUNTRY_NAME', 'MAILING_ADDRESS_1', 'MAILING_ADDRESS_2', 'MAILING_CITY_NAME',
           'MAILING_STATE_CODE', 'MAILING_STATE_NAME', 'MAILING_POSTAL_CODE', 'MAILING_COUNTRY_CODE', 
           'MAILING_COUNTRY_NAME', 'RESIDENCE_COUNTRY_CODE', 'RESIDENCE_COUNTRY_NAME', 'CITIZENSHIP_COUNTRY_CODE', 
           'CITIZENSHIP_COUNTRY_NAME', 'ORG_COUNTRY_OF_BUSINESS_CODE', 'ORG_COUNTRY_OF_BUSINESS_NAME', 'EMPLOYEE_IND', 
           'EMPLOYEE_NUMBER', 'EMPLOYER_NAME', 'EMPLOYER_PHONE_NUMBER', 'EMAIL_ADDRESS', 'OCCUPATION_DESC', 
           'INDUSTRY_CODE', 'INDUSTRY_CODE_RR', 'INDUSTRY_DESC', 'PHONE_NUMBER_1', 'PHONE_NUMBER_2', 
           'PHONE_NUMBER_3', 'ANNUAL_INCOME_AMOUNT', 'NET_WORTH_AMOUNT', 'MARITAL_STATUS_DESC',
            'LAST_CONTACT_DATE', 'POLITICALLY_EXPOSED_PERSON_IND', 'NON_PROFIT_ORG_IND', 'CUSTOMER_SINCE_DATE', 
            'LAST_SUSP_ACTV_RPT_DATE', 'LAST_CASH_TRANS_RPT_DATE', 'LAST_RISK_ASSESSMENT_DATE', 'RISK_CLASSIFICATION',
             'CHANGE_BEGIN_DATE', 'CHANGE_END_DATE', 'CHANGE_CURRENT_IND', 'EXTERNAL_PARTY_IND', 'LEGAL_ENTITY_TYPE', 
             'MONEY_ORDERS_IND', 'TRAVELERS_CHEQUES_IND', 'PREPAID_CARDS_IND', 'MSB_IND', 'MONEY_TRANSMITTER_IND',
              'CURRENCY_EXCHANGE_IND', 'CHECK_CASHER_IND', 'INTERNET_GAMBLING_IND', 'TRUST_ACCOUNT_IND', 
              'FOREIGN_CONSULATE_EMBASSY_IND', 'ISSUES_BEARER_SHARES_IND', 'NEGATIVE_NEWS_IND', 
              'SUSP_ACTV_RPT_COUNT', 'LST_UPDATE_DATE', 'EN_PARTY_FIRST_NAME', 'EN_PARTY_LAST_NAME',
               'EN_PARTY_THIRD_NAME', 'EN_PARTY_MIDDLE_NAME', 'EN_PARTY_NAME', 'PASSPORT_COUNTRY', 
               'PARTY_FATHER_NAME', 'ADDRESS_TYPE', 'ADDRESS_TOWN', 'ADDRESS_COMMENTS', 'OCCUPATION_CODE', 
               'GENDER', 'TITLE', 'BIRTH_PLACE', 'MOTHERS_NAME', 'ALIAS', 'NATIONALITY2', 'NATIONALITY3',
                'TPH_CONTACT_TYPE_1', 'TPH_COMMUNICATION_TYPE_1', 'TPH_COUNTRY_PREFIX_1', 'TPH_EXTENSION_1', 
                'TPH_COMMENTS_1', 'TPH_CONTACT_TYPE_2', 'TPH_COMMUNICATION_TYPE_2', 'TPH_COUNTRY_PREFIX_2',
                 'TPH_EXTENSION_2', 'TPH_COMMENTS_2', 'TPH_CONTACT_TYPE_3', 'TPH_COMMUNICATION_TYPE_3', 
                 'TPH_COUNTRY_PREFIX_3', 'TPH_EXTENSION_3', 'TPH_COMMENTS_3', 'EMPLOYER_ADDRESS_TYPE', 
                 'EMPLOYER_ADDRESS', 'EMPLOYER_TOWN', 'EMPLOYER_CITY', 'EMPLOYER_ZIP', 'EMPLOYER_COUNTRY_CODE',
                  'EMPLOYER_STATE', 'EMPLOYER_ADDRESS_COMMENTS', 'EMPLOYER_CONTACT_TYPE', 'EMPLOYER_COMMUNICATION_TYPE',
                   'EMPLOYER_COUNTRY_PREFIX', 'EMPLOYER_NUMBER', 'EMPLOYER_EXTENSION', 'EMPLOYER_COMMENTS', 'IDENT_ISSUE_DATE', 'IDENT_EXPIRY_DATE', 'IDENT_ISSUED_BY', 'IDENT_ISSUE_COUNTRY', 'IDENT_COMMENTS', 'DECEASED', 'DATE_DECEASED', 'SOURCE_OF_WEALTH', 'COMMENTS', 'INCORPORATION_LEGAL_FORM', 'URL', 'INCORPORATION_STATE', 'INCORPORATION_DATE', 'BUSINESS_CLOSED', 'DATE_BUSINESS_CLOSED', 'ID_EMPLOYER_NAME', 'ID_OCCUPATION_DESC', 'ID_NUMBER', 'CHARITY_DONATIONS_IND', 'GOV_ORG_IND', 'FATCA_CUST_IND', 'PARTY_MAIN_BRANCH_NUMBER', 'RESULT', 
                 'SCREENING_DATE', 'ERRORDESC', 'ENTITY_SEGMENT_ID', 'SEGMENT_ID', 
                 'PURGE_DATE', 'BEN_OWN_EXEMPT_IND', 'SECTOR', 'NUMBER_OF_ACCOUNTS', 
                 'CUSTOMER_SINCE_YEARS', 'LAST_CONTACT_DAYS', 'PARTY_AGE_YEARS', 'PARTY_STATUS',
                  'PARTY_RETAIL_LOAN_STATUS', 'PARTY_RETAIL_AUTO_LOAN_STATUS', 'PARTY_WITH_RETAIL_MORTGAGE',
                   'SEG', 'PENDING_IND', 'RISK_RATING', 'RATING_DATE'];




  }
}
