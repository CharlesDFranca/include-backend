import { InvalidDataError } from "../../../common/errors/InvalidDataError";

export class CRM {
  private readonly value: string;
  private static readonly validStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  constructor(crm: string) {
    if (!CRM.isValid(String(crm))) {
      throw new InvalidDataError("Invalid CRM format or state abbreviation.");
    }
    this.value = crm;
  }

  public get getCRM(): string {
    return this.value;
  }

  public get getSeparateValue(): { value: string; uf: string } {
    return { value: this.getCRM.split("/")[0], uf: this.getCRM.split("/")[1] };
  }

  public static isValid(crm: string): boolean {
    const crmPattern = /^\d{6}-\d{2}\/([A-Z]{2})$/;
    const match = crm.match(crmPattern);

    if (!match) {
      return false;
    }

    const stateAbbreviation = match[1];
    return CRM.validStates.includes(stateAbbreviation);
  }
}
