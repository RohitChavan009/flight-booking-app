import bcrypt from "bcrypt";

export const generateCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let code = "";

  for (let i = 0; i < 6; i++)
    code += characters.charAt(Math.floor(Math.random() * characters.length));

  return code;
};

export const processTimeframe = (timeframe) => {
  const CURRENT_DATE = new Date();

  let start = null;
  let end = null;

  switch (timeframe) {
    case "this week":
      start = new Date(CURRENT_DATE);
      end = new Date(CURRENT_DATE);
      end.setDate(CURRENT_DATE.getDate() + 7);
      break;

    case "next week":
      start = new Date(CURRENT_DATE);
      start.setDate(CURRENT_DATE.getDate() + 7);
      end = new Date(CURRENT_DATE);
      end.setDate(CURRENT_DATE.getDate() + 14);
      break;

    case "this month":
      start = new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), 1);
      end = new Date(
        CURRENT_DATE.getFullYear(),
        CURRENT_DATE.getMonth() + 1,
        0
      );
      break;

    case "next month":
      start = new Date(
        CURRENT_DATE.getFullYear(),
        CURRENT_DATE.getMonth() + 1,
        1
      );
      end = new Date(
        CURRENT_DATE.getFullYear(),
        CURRENT_DATE.getMonth() + 2,
        0
      );
      break;

    default:
      break;
  }

  return { start, end };
};

export const hashPassword = async (password) => {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const calculateTotalAmount = (crop, value, price) => {
  let totalAmount = 0;

  switch (crop) {
    case "banana":
      // tons
      totalAmount = value * 1000 * price || 0;
      break;

    case "coconut":
    case "dryCoconut":
      // nuts
      totalAmount = value * price || 0;
      break;

    case "turmeric":
    case "ragi":
    case "corn":
      // quintals
      totalAmount = value * 100 * price || 0;
      break;

    default:
      throw new Error(`unsupported crop: ${crop}`);
  }

  return totalAmount;
};
